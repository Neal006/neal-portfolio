/* Untrusted chat history from the browser → a bounded, role-safe message list. */

export const MAX_MESSAGES = 12;
export const MAX_CONTENT_CHARS = 2000;
const ALLOWED_ROLES = new Set(["user", "assistant"]);

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** Drops system/unknown roles (prompt injection) and malformed entries,
    keeps the most recent turns, and truncates long content (cost cap). */
export function sanitizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (m): m is ChatMessage =>
        typeof m === "object" && m !== null && ALLOWED_ROLES.has((m as ChatMessage).role) &&
        typeof (m as ChatMessage).content === "string",
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CONTENT_CHARS) }));
}
