import { createOpenAI } from "@ai-sdk/openai";

import { generateObject } from "ai";
import { z } from "zod";

import { config } from "dotenv";
import { json2csv } from "json-2-csv";
config();

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateFakeData(
  type,
  description,
  schema = z.unknown(),
  limit = 10,
<<<<<<< HEAD
  model = "llama3-8b-8192",
=======
<<<<<<< HEAD
<<<<<<< HEAD
  model = "llama3-8b-8192",
=======
  model = 'llama3-8b-8192'
>>>>>>> b441922 (feat(models): support use of different models)
=======
>>>>>>> 9f76933 (Initial commit)
>>>>>>> 55707cc (Initial commit)
) {
  try {
    // Generate the GROQ query dynamically
    const groqQuery = `
      Generate ${limit} entries of fake data according to the following specifications:
      ${description}.
    `;

    const res = await generateObject({
<<<<<<< HEAD
      model: groq(model),
=======
      model: groq("llama3-8b-8192"),
>>>>>>> 9f76933 (Initial commit)
      prompt: groqQuery,
      system:
        "You are a helpful assistant that generates fake data according to the given instructions",
      schema: z.object({
        data: z.object({
          entries: z.array(schema ? z.object(schema) : z.unknown()),
        }),
      }),
    });

    // Convert to CSV if requested, otherwise return JSON
    return type === "csv" ? json2csv(res.object.data.entries) : res.object.data;
  } catch (error) {
    console.error("Error generating fake data:", error);
<<<<<<< HEAD
<<<<<<< HEAD
    throw new Error("Failed to generate fake data");
=======
    throw new Error(
      "Failed to generate fake data, please check you prompt and try again",
    );
>>>>>>> 45d777c (chore(deploy): swap provider)
=======
    throw new Error(
      "Failed to generate fake data, please check you prompt and try again",
    );
=======
    throw new Error("Failed to generate fake data");
>>>>>>> 9f76933 (Initial commit)
>>>>>>> 8e9bc4c (Initial commit)
  }
}
