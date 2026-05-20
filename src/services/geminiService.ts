export interface PatternDesign {
  title: string;
  description: string;
  colors: string[];
  styleHints: string[];
  story: string;
}

export async function generatePatternFromMemory(input: { text?: string; imageBase64?: string; style: string }): Promise<PatternDesign> {
  const response = await fetch('/api/generate-pattern', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || 'Failed to generate pattern on server');
  }

  return response.json();
}
