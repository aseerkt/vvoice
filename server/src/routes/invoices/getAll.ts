import { FastifyPluginAsync } from 'fastify';

const getAll: FastifyPluginAsync = async function (fastify) {
  fastify.get(
    '/',
    { preValidation: [fastify.authenticate] },
    async function (req, res) {
      try {
        const invoices = await fastify.prisma.invoice.findMany({
          where: {
            authorId: req.user.id,
          },
          orderBy: { createdAt: 'desc' },
        });
        res.send(invoices);
      } catch (err) {
        console.log(err);
        fastify.httpErrors.internalServerError('Unable to fetch invoices');
      }
    }
  );
};

export default getAll;
