import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Gemini API Initialization
  let genAI: GoogleGenAI | null = null;
  const getGenAI = () => {
    if (!genAI) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set in environment variables");
      }
      genAI = new GoogleGenAI(apiKey);
    }
    return genAI;
  };

  // API route for pattern generation
  app.post("/api/generate-pattern", async (req, res) => {
    try {
      const { text, imageBase64, style } = req.body;
      const ai = getGenAI();
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

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

      const parts: any[] = [{ text: prompt }];
      if (imageBase64) {
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBase64,
          },
        });
      }

      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object" as any,
            properties: {
              title: { type: "string" as any },
              description: { type: "string" as any },
              colors: { type: "array" as any, items: { type: "string" as any } },
              styleHints: { type: "array" as any, items: { type: "string" as any } },
              story: { type: "string" as any },
            },
            required: ["title", "description", "colors", "styleHints", "story"],
          },
        },
      });

      const response = await result.response;
      res.json(JSON.parse(response.text()));
    } catch (error: any) {
      console.error("API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate pattern" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
