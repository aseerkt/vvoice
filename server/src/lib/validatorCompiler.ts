import { FastifySchema, FastifySchemaCompiler } from 'fastify';

const yupOptions = {
  strict: false,
  abortEarly: false, // return all errors
  stripUnknown: true, // remove additional properties
  recursive: true,
};

const validatorCompiler: FastifySchemaCompiler<FastifySchema> | undefined = ({
  schema,
  method,
  url,
  httpPart,
}) => {
  return function (data: any) {
    // with option strict = false, yup `validateSync` function returns the coerced value if validation was successful, or throws if validation failed
    try {
      const result = (schema as any).validateSync(data, yupOptions);
      console.log(data, result);
      return { value: result };
    } catch (e) {
      e.validationPart = httpPart;
      return { error: e };
    }
  };
};

export default validatorCompiler;
