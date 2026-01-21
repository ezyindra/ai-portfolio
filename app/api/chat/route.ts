import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  const systemPrompt = `
You are Indra AI — a personal assistant for Indra.

Answer only using Indra's profile, projects, skills, and experience.
Be friendly, professional, and concise.
If you don't know something, say so honestly.
`;

  const response = await fetch("http://127.0.0.1:8080/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.6,
      max_tokens: 300
    }),
  });

  const data = await response.json();

  return NextResponse.json({
    reply: data.choices[0].message.content
  });
}
