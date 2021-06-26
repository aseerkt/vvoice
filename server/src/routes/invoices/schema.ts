import Joi = require('joi');

export interface Invoice {
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

export const AddInvoiceSchema = Joi.object()
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
