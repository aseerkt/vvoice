import { FastifyPluginAsync } from 'fastify';

const getOne: FastifyPluginAsync = async function (fastify) {
  fastify.get<{ Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.authenticate] },
    async function (req, res) {
      try {
        const invoice = await fastify.prisma.invoice.findFirst({
          where: {
            id: req.params.id,
            authorId: req.user.id,
          },
        });
        if (!invoice) {
          return fastify.httpErrors.notFound('Invoice not found');
        }
        res.send(invoice);
      } catch (err) {
        console.log(err);
        fastify.httpErrors.internalServerError('Unable to fetch invoices');
      }
    }
  );
};

export default getOne;
