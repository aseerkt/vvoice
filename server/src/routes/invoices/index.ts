import { FastifyPluginAsync } from 'fastify';
import * as Joi from 'joi';
// import validatorCompiler from '../../lib/validatorCompiler';

interface Invoice {
  uuid6: string;
  billerStreetAddress: string;
  billerCity: string;
  billerZipCode: string;
  billerCountry: string;
  clientName: string;
  clientEmail: string;
  clientStreetAddress: string;
  clientCity: string;
  clientZipCode: string;
  clientCountry: string;
  invoiceDateUnix: number;
  invoiceDate: string;
  paymentTerms: string;
  paymentDueDateUnix: number;
  paymentDueDate: string;
  productDescription: string;
  invoicePending: boolean;
  invoiceDraft: boolean;
  invoiceTotal: number;
  invoiceItemList: [
    {
      itemName: string;
      qty: number;
      price: number;
    }
  ];
}

const AddInvoiceSchema = Joi.object()
  .keys({
    uuid6: Joi.string().required(),
    billerStreetAddress: Joi.string().required(),
    billerCity: Joi.string().required(),
    billerZipCode: Joi.string().required(),
    billerCountry: Joi.string().required(),
    clientName: Joi.string().required(),
    clientEmail: Joi.string().email().required(),
    clientStreetAddress: Joi.string().required(),
    clientCity: Joi.string().required(),
    clientZipCode: Joi.string().required(),
    clientCountry: Joi.string().required(),
    paymentTerms: Joi.string().required(),
    invoiceDate: Joi.string().required(),
    paymentDueDate: Joi.string().required(),
    invoiceDateUnix: Joi.number().integer().required(),
    paymentDueDateUnix: Joi.number().integer().required(),
    productDescription: Joi.string().required(),
    invoicePending: Joi.boolean().required(),
    invoiceDraft: Joi.boolean().required(),
    invoiceTotal: Joi.number().required(),
    invoiceItemList: [
      Joi.object().keys({
        itemName: Joi.string().required(),
        qty: Joi.number().integer().required(),
        price: Joi.number().required(),
      }),
    ],
  })
  .required();

const invoices: FastifyPluginAsync = async function (fastify, opts) {
  fastify.post<{ Body: Invoice }>(
    '/new',
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
        const invoiceItems = await fastify.prisma.invoiceItem.createMany({
          data: [
            ...req.body.invoiceItemList.map(({ itemName, price, qty }) => ({
              invoiceId: invoice.id,
              itemName: itemName,
              price: price,
              qty: qty,
            })),
          ],
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

export default invoices;
