import { verify } from 'argon2';
import { FastifyPluginAsync } from 'fastify';
import * as Joi from 'joi';

interface LoginBodyType {
  email: string;
  password: string;
}

const LoginBodySchema = Joi.object()
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  .required();

const login: FastifyPluginAsync = async function (fastify, opts) {
  // Login

  fastify.post<{ Body: LoginBodyType }>(
    '/login',
    {
      schema: {
        body: LoginBodySchema,
      },
    },
    async (req, res) => {
      try {
        const { email, password } = req.body;

        const user = await fastify.prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          return res.code(404).send({
            statusCode: 404,
            error: 'Not found',
            message: '"email" not registered',
          });
        }

        const isMatch = await verify(user.password, password);
        if (!isMatch) {
          return res.code(400).send({ password: 'Password is incorrect' });
        }

        const token = await res.jwtSign({ id: user.id }, { expiresIn: '7d' });

        return res.code(200).send({
          id: user.id,
          name: user.name,
          email: user.email,
          photoURL: user.photoURL,
          token,
        });
      } catch (err) {
        console.log(err);
        res.code(500).send({ error: 'Unable to login user' });
      }
    }
  );
};

export const autoPrefix = '/prefixed';
export default login;
