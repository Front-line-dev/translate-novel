// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI, Type } from "@google/genai";

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      required: ["translated", "note"],
      properties: {
        translated: {
          type: Type.STRING,
        },
        note: {
          type: Type.STRING,
        },
      },
    },
    systemInstruction: [
      {
        text: ``,
      },
    ],
  };
  const model = "gemini-2.5-pro-preview-05-06";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  console.log(response);
}

main();
