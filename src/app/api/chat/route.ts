export const runtime = 'edge';

import { SYSTEM_PROMPT } from "@/lib/chatPrompt";

const STREAM_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
  /* Prevent Vercel / nginx from buffering the SSE stream */
  "X-Accel-Buffering": "no",
};

export async function POST(req: Request) {
  let messages = [];
  try {
    const body = await req.json();
    messages = body.messages || [];
  } catch (e) {
    return new Response("Invalid JSON body", { status: 400 });
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return new Response("API key not configured", { status: 503 });
  }

  let upstream: Response;
  try {
    upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://neal-daftary.vercel.app",
        "X-Title": "Neal Daftary Portfolio",
      },
      body: JSON.stringify({
        model: "google/gemma-4-31b-it:free",
        max_tokens: 512,
        stream: true,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });
  } catch {
    return new Response("Could not reach AI service — try again shortly.", { status: 502, headers: STREAM_HEADERS });
  }

  /* If OpenRouter returned an error, stream it back so the client shows it */
  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => `HTTP ${upstream.status}`);
    return new Response(`Sorry, couldn't get a response right now. (${upstream.status})`, {
      status: 200,
      headers: STREAM_HEADERS,
    });
  }

  /* Forward OpenRouter SSE → plain text stream to the client */
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let hasContent = false;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") { controller.close(); return; }
            try {
              const chunk = JSON.parse(payload);
              /* OpenRouter may return an error object inside a 200 SSE stream */
              if (chunk.error) {
                if (!hasContent) controller.enqueue(encoder.encode("Sorry, I hit an error. Reach Neal at builtbyneal@gmail.com"));
                controller.close();
                return;
              }
              const text = chunk.choices?.[0]?.delta?.content ?? "";
              if (text) {
                hasContent = true;
                controller.enqueue(encoder.encode(text));
              }
            } catch {
              /* malformed chunk — skip */
            }
          }
        }
      } catch {
        if (!hasContent) controller.enqueue(encoder.encode("Connection dropped — try again."));
      }
      controller.close();
    },
  });

  return new Response(readable, { headers: STREAM_HEADERS });
}
