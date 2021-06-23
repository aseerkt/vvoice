import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

export default fp(async function (fastify, opts) {
  const prismaClient = new PrismaClient({ log: ['query'] });

  fastify.decorate('prisma', prismaClient);
});

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient<
      {
        log: 'query'[];
      },
      never,
      false
    >;
  }
}
