export interface PatternDesign {
  title: string;
  description: string;
  colors: string[];
  styleHints: string[];
  story: string;
}

export async function generatePatternFromMemory(input: { text?: string; imageBase64?: string; style: string }): Promise<PatternDesign> {
  const response = await fetch("/api/generate-pattern", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to generate pattern design details.");
  }

  return response.json();
}
