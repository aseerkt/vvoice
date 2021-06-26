import { FastifyPluginAsync } from 'fastify';
import getAll from './getAll';
import getOne from './getOne';
import newInvoice from './new';

const invoices: FastifyPluginAsync = async function (fastify, opts) {
  fastify.register(newInvoice);
  fastify.register(getAll);
  fastify.register(getOne);
};

export default invoices;
