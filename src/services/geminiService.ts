import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface PatternDesign {
  title: string;
  description: string;
  colors: string[];
  styleHints: string[];
  story: string;
}

export async function generatePatternFromMemory(input: { text?: string; imageBase64?: string; style: string }): Promise<PatternDesign> {
  const { text, imageBase64, style } = input;

  const prompt = `
    Transform the following memory into a unique fashion pattern design for a high-end personal brand called "Cadeau".
    The brand aesthetic is Romantic, Vintage, Soft Luxury, and Balletcore.
    
    User Input: ${text || "A provided image"}
    Selected Style: ${style}
    
    Response must be a JSON object with:
    - title: A poetic name for the pattern.
    - description: A brief technical description of the pattern elements (motifs, layout).
    - colors: An array of 3-5 hex color codes that fit the Balletcore/Vintage aesthetic.
    - styleHints: Key visual terms for generation.
    - story: A romantic, emotional story behind this design based on the user's memory.
  `;

  const contents: any[] = [{ text: prompt }];
  if (imageBase64) {
    contents.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64,
      },
    });
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: { parts: contents },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          colors: { type: Type.ARRAY, items: { type: Type.STRING } },
          styleHints: { type: Type.ARRAY, items: { type: Type.STRING } },
          story: { type: Type.STRING },
        },
        required: ["title", "description", "colors", "styleHints", "story"],
      },
    },
  });

  try {
    return JSON.parse(response.text || "{}") as PatternDesign;
  } catch (e) {
    console.error("Failed to parse pattern design", e);
    throw new Error("Could not generate pattern design details.");
  }
}
