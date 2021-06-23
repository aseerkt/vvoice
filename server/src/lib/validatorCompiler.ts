import { FastifySchema, FastifySchemaCompiler } from 'fastify';

const JoiOptions = {
  abortEarly: false, // return all errors
};

const validatorCompiler: FastifySchemaCompiler<FastifySchema> | undefined = ({
  schema,
  method,
  url,
  httpPart,
}) => {
  return (data) => (schema as any).validate(data, JoiOptions);
};

export default validatorCompiler;
