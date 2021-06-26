import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload';
import fastifyCors from 'fastify-cors';
import { FastifyPluginAsync } from 'fastify';
import Joi = require('joi');

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!

  fastify.register(fastifyCors, { origin: 'http://localhost:8080' });

  fastify.setValidatorCompiler(
    ({ schema }) =>
      (data) =>
        (schema as Joi.ObjectSchema<any>).validate(data, {
          abortEarly: false,
        })
  );

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: { ...opts, prefix: '/api' },
  });
};

export default app;
export { app };
