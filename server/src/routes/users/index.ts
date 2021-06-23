import { FastifyPluginAsync } from 'fastify';
import prismaClient from '../../lib/prisma';

const me: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // Register

  fastify.get(
    '/',
    { preValidation: [fastify.authenticate] },
    async function (req, res) {
      try {
        const user = await prismaClient.user.findUnique({
          where: { id: req.user.id },
          select: {
            id: true,
            name: true,
            email: true,
            photoURL: true,
          },
        });
        return res.send(user);
      } catch (err) {
        console.log(err);
        res.code(500).send({ error: 'Unable to authenticate user' });
      }
    }
  );
};

export default me;
