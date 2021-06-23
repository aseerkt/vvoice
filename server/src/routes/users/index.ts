import { FastifyPluginAsync } from 'fastify';
// routes
import signup from './signup';
import login from './login';
import me from './me';

// @route api/users

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // Register
  fastify.register(signup);
  fastify.register(login);
  fastify.register(me);
};

export default users;
