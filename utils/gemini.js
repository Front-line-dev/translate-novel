import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs";

const TRANSLATE_PROMPT = fs.readFileSync("./prompt/translate.md", "utf-8");
const RETRANSLATE_PROMPT = fs.readFileSync("./prompt/retranslate.md", "utf-8");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = "gemini-3.1-flash-lite-preview";

async function requestTranslate(novelText, novelNote, chapter) {
  const noteBase64 = Buffer.from(novelNote, "utf-8").toString("base64");

  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
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
        text: TRANSLATE_PROMPT + chapter,
      },
    ],
  };

  const contents = [
    {
      role: "user",
      parts: [
        {
          inlineData: {
            data: noteBase64,
            mimeType: `text/plain`,
          },
        },
        {
          text: novelText,
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model: MODEL,
    config,
    contents,
  });

  console.log(response);

  //   GenerateContentResponse {
  //   modelVersion: 'gemini-3.1-flash-lite-preview',
  //   promptFeedback: { blockReason: 'PROHIBITED_CONTENT' },
  //   usageMetadata: {
  //     promptTokenCount: 8816,
  //     totalTokenCount: 8816,
  //     promptTokensDetails: [ [Object] ]
  //   }
  // }

  // ```json 마크업 문법으로 Structured output이 시작하는 버그 제어
  const responseText = response.text.replace("```json", "");

  const responseObject = JSON.parse(responseText);

  return {
    translated: responseObject.translated,
    newNote: responseObject.note,
  };
}

async function requestRetranslate(translated, novelNote) {
  const noteBase64 = Buffer.from(novelNote, "utf-8").toString("base64");

  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      required: ["retranslated"],
      properties: {
        retranslated: {
          type: Type.STRING,
        },
      },
    },
    systemInstruction: [
      {
        text: RETRANSLATE_PROMPT,
      },
    ],
  };

  const contents = [
    {
      role: "user",
      parts: [
        {
          inlineData: {
            data: noteBase64,
            mimeType: `text/plain`,
          },
        },
        {
          text: translated,
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model: MODEL,
    config,
    contents,
  });

  const responseObject = JSON.parse(response.text);
  return responseObject;
}

export { requestTranslate, requestRetranslate };
