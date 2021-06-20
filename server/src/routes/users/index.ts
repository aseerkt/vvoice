import { FastifyPluginAsync } from 'fastify';
import { Type, Static } from '@sinclair/typebox';
import prismaClient from '../../lib/prisma';
import { hash } from 'argon2';

const GRAVATAR_URL =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

const SignUpBody = Type.Object({
  name: Type.String(),
  email: Type.String(),
  password: Type.String(),
});

type SignUpBodyType = Static<typeof SignUpBody>;

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{ Body: SignUpBodyType }>(
    '/signup',
    {
      schema: {
        body: SignUpBody,
      },
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
        const user = await prismaClient.user.create({
          data: {
            email,
            name,
            password: await hash(password),
            photoURL: GRAVATAR_URL,
          },
        });
        res.code(201).send(user);
      } catch (err) {}
    }
  );
};

export default users;
