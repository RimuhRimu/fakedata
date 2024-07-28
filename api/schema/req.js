import { z, ZodParsedType } from "zod";

const apiReq = z.object({
  type: z.enum(["json", "csv"]),
  description: z.string().max(100),
  schema: z.unknown(),
  limit: z.number().min(5).max(25),
});

function jsonToZod(object) {
  return Object.entries(object).reduce((obj, curr) => {
    const [field, type] = curr;
    if (!Object.values(ZodParsedType).includes(type)) {
      throw new Error(
        `Invalid field type in schema: ${type} in field ${field}`,
      );
    }
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
    }
    return obj;
  }, {});
}

export function validateObj(object) {
  console.log({ object })
  return apiReq.safeParse({ ...object, schema: object.schema ? jsonToZod(object.schema) : null });
}
