import { FastifyPluginAsync } from 'fastify';
import newInvoice from './new';

const invoices: FastifyPluginAsync = async function (fastify, opts) {
  fastify.register(newInvoice);
};

export default invoices;
