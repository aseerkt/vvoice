import fp from 'fastify-plugin';
import fastifyJwt, { FastifyJWTOptions } from 'fastify-jwt';
import { FastifyReply, FastifyRequest } from 'fastify';

export default fp<FastifyJWTOptions>(async function (fastify, opts) {
  fastify.register(fastifyJwt, {
    secret: fastify.config.JWT_SECRET,
  });

  fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
});

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate(): void;
  }
}

declare module 'fastify-jwt' {
  interface FastifyJWT {
    payload: { id: string };
  }
}
