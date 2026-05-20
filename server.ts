import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Gemini pattern generation endpoint
  app.post("/api/generate-pattern", async (req, res) => {
    try {
      const { text, imageBase64, style } = req.body;
      const ai = getAiClient();

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

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: { parts },
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

      const textResult = response.text;
      if (!textResult) {
        throw new Error("No response from AI");
      }
      
      res.json(JSON.parse(textResult));
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).send(error.message || "Failed to generate pattern using Gemini");
    }
  });

  let isProduction = process.env.NODE_ENV === "production" || process.env.ENV === "production";

  // Vite middleware for development
  if (!isProduction) {
    console.log("Starting in development mode with Vite...");
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.warn("Vite not found or failed to start, falling back to static serving if dist exists.");
      isProduction = true; // Fallback to production mode behavior
    }
  }

  if (isProduction) {
    console.log("Starting in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      res.sendFile(indexPath, (err) => {
        if (err) {
          res.status(404).send("index.html not found in dist. Did you run the build?");
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
