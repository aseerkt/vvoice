import { FastifyPluginAsync } from 'fastify';
import * as Joi from 'joi';
// import validatorCompiler from '../../lib/validatorCompiler';

interface Invoice {
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
  invoiceDateUnix: string;
  invoiceDate: string;
  paymentTerms: string;
  paymentDueDateUnix: string;
  paymentDueDate: string;
  productDescription: string;
  invoicePending: string;
  invoiceDraft: string;
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
    invoiceDateUnix: Joi.string().required(),
    invoiceDate: Joi.string().required(),
    paymentTerms: Joi.string().required(),
    paymentDueDateUnix: Joi.string().required(),
    paymentDueDate: Joi.string().required(),
    productDescription: Joi.string().required(),
    invoicePending: Joi.string().required(),
    invoiceDraft: Joi.string().required(),
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
    },
    async function (req, res) {
      try {
        res.send({ hello: 'world' });
      } catch (err) {}
    }
  );
};

export default invoices;
