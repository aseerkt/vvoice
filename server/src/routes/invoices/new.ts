import { FastifyPluginAsync } from 'fastify';
import { AddInvoiceSchema, Invoice } from './schema';

const newInvoice: FastifyPluginAsync = async function (fastify) {
  fastify.post<{ Body: Invoice }>(
    '/',
    {
      schema: { body: AddInvoiceSchema },
      preValidation: [fastify.authenticate],
    },
    async function (req, res) {
      try {
        const invoice = await fastify.prisma.invoice.create({
          data: {
            uuid6: req.body.uuid6,
            billerCity: req.body.billerCity,
            billerCountry: req.body.billerCountry,
            billerStreetAddress: req.body.billerStreetAddress,
            billerZipCode: req.body.billerZipCode,
            clientName: req.body.clientName,
            clientCity: req.body.clientCity,
            clientCountry: req.body.clientCountry,
            clientStreetAddress: req.body.clientStreetAddress,
            clientZipCode: req.body.clientZipCode,
            clientEmail: req.body.clientEmail,
            invoiceDate: req.body.invoiceDate,
            paymentDueDate: req.body.paymentDueDate,
            invoiceDateUnix: req.body.invoiceDateUnix,
            paymentDueDateUnix: req.body.paymentDueDateUnix,
            authorId: req.user.id,
            invoiceDraft: req.body.invoiceDraft,
            invoicePending: req.body.invoicePending,
            invoiceTotal: req.body.invoiceTotal,
            paymentTerms: req.body.paymentTerms,
            productDescription: req.body.productDescription,
          },
        });
        const itemsToAdd = req.body.invoiceItemList.map(
          ({ itemName, price, qty }) => ({
            invoiceId: invoice.id,
            itemName: itemName,
            price: price,
            qty: qty,
          })
        );
        const invoiceItems = await fastify.prisma.invoiceItem.createMany({
          data: itemsToAdd,
          skipDuplicates: true,
        });

        res.send({
          invoice: {
            ...invoice,
            invoiceItems,
          },
        });
      } catch (err) {
        fastify.log.error(err);
        res.code(500).send({ error: 'Unable to add invoices' });
      }
    }
  );
};

export default newInvoice;
