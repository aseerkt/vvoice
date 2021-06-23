import fp from 'fastify-plugin';
import fastifyEnv, { fastifyEnvOpt } from 'fastify-env';

export default fp<fastifyEnvOpt>(async function (fastify, opts) {
  await fastify.register(fastifyEnv, {
    dotenv: true,
    schema: {
      type: 'object',
      required: ['JWT_SECRET'],
      properties: {
        JWT_SECRET: { type: 'string' },
      },
    },
  });
});

declare module 'fastify' {
  export interface FastifyInstance {
    config: {
      JWT_SECRET: string;
    };
  }
}
