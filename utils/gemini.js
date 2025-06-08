import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs";

// ../prompt/translate.md text
const TRANSLATE_PROMPT = "";

//  ../prompt/retranslate.md text
const RETRANSLATE_PROMPT = "";

const MODEL = "gemini-2.5-pro-preview-05-06";

// Translate config
const TRANSLATE_CONFIG = {
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
      text: TRANSLATE_PROMPT,
    },
  ],
};

// Retranslate config
const RETRANSLATE_CONFIG = {};

async function requestTranslate(novelText, novelNote) {
  // Generate UTF-8 .txt file with novelNote
  // Convert the file to base64
  const noteBase64 = "";

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
    MODEL,
    TRANSLATE_CONFIG,
    contents,
  });

  return response.text;
}

async function requestRetranslate(novelText, novelNote) {}
