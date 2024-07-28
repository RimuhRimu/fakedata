import { z, ZodParsedType } from "zod";

<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 55707cc (Initial commit)
const models = [
  "llama3-8b-8192",
  "mixtral-8x7b-32768",
  "llama3-groq-8b-8192-tool-use-preview",
  "llama3-groq-70b-8192-tool-use-preview",
  "llama-3.1-8b-instant",
  "llama-3.1-70b-versatile",
  "gemma2-9b-it",
  "gemma-7b-it",
];

const apiReq = z.object({
  type: z.enum(["json", "csv"]),
  description: z.string().max(100),
  schema: z.unknown().optional(),
  limit: z.number().min(1).max(50),
  model: z.enum(models).optional(),
<<<<<<< HEAD
=======
=======
  limit: z.number().min(5).max(25),
  model: z.enum(models).optional()
>>>>>>> 12d4f25 (feat(models): add models to the schema)
=======
const apiReq = z.object({
  type: z.enum(["json", "csv"]),
  description: z.string().max(100),
  schema: z.unknown(),
  limit: z.number().min(5).max(25),
>>>>>>> 9f76933 (Initial commit)
>>>>>>> 55707cc (Initial commit)
});

function jsonToZod(object) {
  return Object.entries(object).reduce((obj, curr) => {
<<<<<<< HEAD
    //NOTE: we handle the case where ${type} is an object, as so we need to create a zod object
    const [field, type] = curr;
    if (typeof type === "object") {
      obj[field] = z.object(jsonToZod(type));
    } else if (!Object.values(ZodParsedType).includes(type)) {
      throw new Error(
        `Invalid field type in schema: ${type} in field ${field}`,
      );
    } else {
<<<<<<< HEAD
=======
=======
    if (typeof (type) === "object") {
      obj[field] = z.object(jsonToZod(type));
    }
    else if (!Object.values(ZodParsedType).includes(type)) {
=======
    const [field, type] = curr;
    if (!Object.values(ZodParsedType).includes(type)) {
>>>>>>> 9f76933 (Initial commit)
      throw new Error(
        `Invalid field type in schema: ${type} in field ${field}`,
      );
    }
<<<<<<< HEAD
    else {
>>>>>>> 12d4f25 (feat(models): add models to the schema)
>>>>>>> 55707cc (Initial commit)
      switch (type) {
        case "string":
          obj[field] = z.string();
          break;
        case "number":
          obj[field] = z.number();
          break;
        case "integer":
          obj[field] = z.number().int();
          break;
        case "array":
          obj[field] = z.array();
          break;
        case "boolean":
          obj[field] = z.boolean();
          break;
        default:
          throw new Error(`Unsopported type ${type} for field ${field}`);
      }
=======
    switch (type) {
      case "string":
        obj[field] = z.string();
        break;
      case "number":
        obj[field] = z.number();
        break;
      case "integer":
        obj[field] = z.number().int();
        break;
      default:
        throw new Error(`Unsopported type ${type} for field ${field}`);
>>>>>>> 9f76933 (Initial commit)
    }
    return obj;
  }, {});
}

export function validateObj(object) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 55707cc (Initial commit)
  return apiReq.safeParse({
    ...object,
    schema: object.schema ? jsonToZod(object.schema) : null,
  });
<<<<<<< HEAD
=======
=======
  return apiReq.safeParse({ ...object, schema: object.schema ? jsonToZod(object.schema) : null });
>>>>>>> 12d4f25 (feat(models): add models to the schema)
=======
  console.log({ object })
  return apiReq.safeParse({ ...object, schema: object.schema ? jsonToZod(object.schema) : null });
>>>>>>> 9f76933 (Initial commit)
>>>>>>> 55707cc (Initial commit)
}
