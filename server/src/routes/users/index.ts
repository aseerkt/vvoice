import { FastifyPluginAsync } from 'fastify';
import { hash } from 'argon2';
import * as Joi from 'joi';
import prismaClient from '../../lib/prisma';

const GRAVATAR_URL =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

interface SignUpBodyType {
  name: string;
  email: string;
  password: string;
}

const SignUpBodySchema = Joi.object()
  .keys({
    name: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })
  .required();

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{ Body: SignUpBodyType }>(
    '/signup',
    {
      schema: {
        body: SignUpBodySchema,
      },
      validatorCompiler:
        ({ schema, method, url, httpPart }) =>
        (data) =>
          (schema as any).validate(data, { abortEarly: false }),
    },
    async function (req, res) {
      try {
        const { name, email, password } = req.body;
        const emailUser = await prismaClient.user.findUnique({
          where: { email },
        });
        if (emailUser) {
          return res.code(400).send({ email: 'Email already registered' });
        }
        const hashedPassword = await hash(password);
        const user = await prismaClient.user.create({
          data: {
            email,
            name,
            password: hashedPassword,
            photoURL: GRAVATAR_URL,
          },
        });
        res.code(201).send(user);
      } catch (err) {
        console.error(err);
        res.code(500).send({ error: 'Unable to register user' });
      }
    }
  );
};

export default users;
