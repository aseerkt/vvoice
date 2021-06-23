import fp from 'fastify-plugin';
import fastifyEnv, { fastifyEnvOpt } from 'fastify-env';

export default fp<fastifyEnvOpt>(async function (fastify, opts) {
  await fastify.register(fastifyEnv, {
    dotenv: true,
    schema: {
      type: 'object',
      required: ['JWT_SECRET', 'NODE_ENV'],
      properties: {
        JWT_SECRET: { type: 'string' },
        NODE_ENV: { type: 'string' },
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
