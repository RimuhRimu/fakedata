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
  model = "llama3-8b-8192",
) {
  try {
    // Generate the GROQ query dynamically
    const groqQuery = `
      Generate ${limit} entries of fake data according to the following specifications:
      ${description}.
    `;

    const res = await generateObject({
      model: groq(model),
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
    throw new Error(
      "Failed to generate fake data, please check you prompt and try again",
    );
  }
}
