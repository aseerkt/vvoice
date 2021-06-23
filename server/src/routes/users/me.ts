import { FastifyPluginAsync } from 'fastify';

const me: FastifyPluginAsync = async function (fastify, opts) {
  fastify.get(
    '/me',
    { preValidation: [fastify.authenticate] },
    async function (req, res) {
      try {
        const user = await fastify.prisma.user.findUnique({
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
