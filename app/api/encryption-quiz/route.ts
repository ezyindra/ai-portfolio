import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

type MCQ = {
  question: string;
  options: string[];
  correctIndex: number;
};

export async function GET() {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key missing" },
        {
          status: 500,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        }
      );
    }

    const entropy = crypto.randomUUID();

    const prompt = `
You are generating UNIQUE security quiz questions.

Generate exactly 3 multiple-choice questions related to:
- web security
- encryption
- systems engineering
- AI or software fundamentals

Rules:
- Each question must have exactly 4 options
- Only ONE option is correct
- Questions must be different every time
- Avoid repeating common examples
- Return STRICT JSON ONLY in this format:

[
  {
    "question": "string",
    "options": ["a", "b", "c", "d"],
    "correctIndex": 0
  }
]

Request ID: ${entropy}
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://your-portfolio-domain.com",
          "X-Title": "Encrypted Portfolio Quiz",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          temperature: 1.1,
          top_p: 0.95,
          max_tokens: 600,
          messages: [
            { role: "system", content: "You ONLY return valid JSON. No explanations." },
            { role: "user", content: prompt },
          ],
        }),
      }
    );

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) throw new Error("Invalid AI response");

    const questions: MCQ[] = JSON.parse(content);

    if (!Array.isArray(questions) || questions.length !== 3) {
      throw new Error("Invalid question format");
    }

    return NextResponse.json(
      { questions },
      {
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        questions: [
          {
            question: "What security property ensures data is not altered in transit?",
            options: ["Availability", "Integrity", "Latency", "Redundancy"],
            correctIndex: 1,
          },
          {
            question: "Which mechanism is commonly used to verify server identity?",
            options: ["IP whitelisting", "Digital certificates", "Symmetric keys", "Hash tables"],
            correctIndex: 1,
          },
          {
            question: "What does end-to-end encryption primarily prevent?",
            options: ["Packet loss", "Unauthorized interception", "Slow networks", "Server downtime"],
            correctIndex: 1,
          },
        ],
      },
      {
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      }
    );
  }
}
