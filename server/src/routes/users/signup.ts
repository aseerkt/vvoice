import { hash } from 'argon2';
import { FastifyPluginAsync } from 'fastify';
import * as Joi from 'joi';

const GRAVATAR_URL =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

interface SignUpBodyType {
  name: string;
  email: string;
  password: string;
}

const SignUpBodySchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })
  .required();

const signup: FastifyPluginAsync = async function (fastify, opts) {
  fastify.post<{ Body: SignUpBodyType }>(
    '/signup',
    {
      schema: {
        body: SignUpBodySchema,
      },
      // validatorCompiler,
    },
    async function (req, res) {
      try {
        const { name, email, password } = req.body;
        const emailUser = await fastify.prisma.user.findUnique({
          where: { email },
        });
        if (emailUser) {
          return res.code(400).send({ email: 'Email already registered' });
        }
        const hashedPassword = await hash(password);
        const user = await fastify.prisma.user.create({
          data: {
            email,
            name,
            password: hashedPassword,
            photoURL: GRAVATAR_URL,
          },
          select: {
            id: true,
            name: true,
            email: true,
            photoURL: true,
          },
        });
        const token = await res.jwtSign({ id: user.id }, { expiresIn: '7d' });
        res.code(201).send({ ...user, token });
      } catch (err) {
        console.error(err);
        res.code(500).send({ error: 'Unable to register user' });
      }
    }
  );
};

export default signup;
