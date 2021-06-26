import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient({ log: ['query'] });

export default fp(async function (fastify, opts) {
  fastify.decorate('prisma', prismaClient);

  fastify.addHook('onClose', async function (instance) {
    await instance.prisma.$disconnect();
  });

  // prismaClient.$on('beforeExit', () => {
  //   fastify.log.info('DB disconnected');
  // });
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
