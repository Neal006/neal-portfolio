"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  streaming?: boolean;
}

const SUGGESTIONS = [
  "What are Neal's skills?",
  "Tell me about his projects",
  "Research & publications?",
  "How to contact Neal?",
];

const GREETING =
  "Hey there! 👋 I'm Neal's AI assistant. Ask me anything about his skills, projects, experience, or research!";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", role: "bot", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      setShowSuggestions(false);

      const userMsg: Message = { id: Date.now().toString(), role: "user", text: text.trim() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      // Build API messages from history (excluding greeting + bot-only messages structure)
      const history = messages
        .filter((m) => m.id !== "0")
        .map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text }));
      history.push({ role: "user", content: text.trim() });

      const botId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { id: botId, role: "bot", text: "", streaming: true }]);

      abortRef.current = new AbortController();
      let accumulated = "";

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: abortRef.current.signal,
        });

        if (!res.body) throw new Error("No stream");
        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botId ? { ...m, text: accumulated, streaming: true } : m
            )
          );
        }

        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, streaming: false } : m))
        );
      } catch (err: unknown) {
        if ((err as Error).name !== "AbortError") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botId
                ? {
                    ...m,
                    text: "Hmm, something went wrong. Reach Neal directly at builtbyneal@gmail.com 📧",
                    streaming: false,
                  }
                : m
            )
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[100] rounded-full flex items-center justify-center shadow-2xl"
        style={{
          width: 56,
          height: 56,
          background: open
            ? "var(--bg-elevated)"
            : "linear-gradient(135deg, #E5001A 0%, #AA0015 100%)",
          color: open ? "var(--text)" : "#fff",
          border: "2px solid var(--accent-y)",
          boxShadow: open ? "0 0 0 0 transparent" : "0 0 28px rgba(229,0,26,0.45)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle AI chat"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={open ? "close" : "open"}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: 22, lineHeight: 1, display: "block" }}
          >
            {open ? "✕" : "✦"}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Online indicator dot */}
      {!open && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-10 right-5 z-[101] rounded-full"
          style={{
            width: 10,
            height: 10,
            background: "var(--accent-g)",
            border: "2px solid var(--bg)",
          }}
        />
      )}

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 48, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-20 right-6 z-[99] rounded-2xl flex flex-col overflow-hidden"
            style={{
              width: "min(390px, calc(100vw - 24px))",
              height: 540,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(229,0,26,0.2)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{
                background: "var(--bg-elevated)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="rounded-full flex items-center justify-center text-base font-bold shrink-0"
                style={{
                  width: 36,
                  height: 36,
                  background: "linear-gradient(135deg, #E5001A, #AA0015)",
                  color: "#fff",
                }}
              >
                ✦
              </motion.div>
              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: "var(--text)",
                    lineHeight: 1.3,
                  }}
                >
                  Neal&apos;s AI
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "var(--accent-g)",
                    lineHeight: 1,
                  }}
                >
                  ● Online
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full flex items-center justify-center shrink-0"
                style={{
                  width: 28,
                  height: 28,
                  background: "var(--bg)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                  fontSize: 14,
                }}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
              style={{ scrollbarWidth: "none" }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "bot" && (
                    <div
                      className="rounded-full flex items-center justify-center text-xs shrink-0 mr-2 mt-auto mb-0.5"
                      style={{
                        width: 22,
                        height: 22,
                        background: "linear-gradient(135deg, #E5001A, #AA0015)",
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    >
                      ✦
                    </div>
                  )}
                  <div
                    className="rounded-2xl text-sm leading-relaxed"
                    style={{
                      maxWidth: "78%",
                      padding: "10px 14px",
                      background:
                        msg.role === "user" ? "var(--accent-y)" : "var(--bg-elevated)",
                      color: msg.role === "user" ? "#fff" : "var(--text)",
                      fontFamily: "var(--font-body)",
                      whiteSpace: "pre-line",
                      borderRadius:
                        msg.role === "user"
                          ? "18px 18px 4px 18px"
                          : "18px 18px 18px 4px",
                    }}
                  >
                    {msg.text || (
                      <span className="flex gap-1 items-center">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={{ y: [-3, 0, -3] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.7,
                              delay: i * 0.18,
                              ease: "easeInOut",
                            }}
                            style={{
                              display: "inline-block",
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "var(--accent-y)",
                            }}
                          />
                        ))}
                      </span>
                    )}
                    {msg.streaming && msg.text && (
                      <span
                        className="inline-block w-0.5 h-4 ml-0.5 align-middle animate-pulse"
                        style={{ background: "var(--accent-y)", verticalAlign: "middle" }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0"
                  style={{ borderTop: "1px solid var(--border)", paddingTop: 8 }}
                >
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full text-xs transition-all"
                      style={{
                        padding: "4px 11px",
                        background: "var(--bg-elevated)",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent-y)";
                        e.currentTarget.style.color = "var(--accent-y)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.color = "var(--text-muted)";
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div
              className="px-3 py-3 flex items-center gap-2 shrink-0"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask anything about Neal…"
                className="flex-1 rounded-xl text-sm outline-none"
                style={{
                  padding: "10px 14px",
                  background: "var(--bg-elevated)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-y)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
              <motion.button
                onClick={() => send(input)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="rounded-xl flex items-center justify-center shrink-0 font-bold"
                style={{
                  width: 40,
                  height: 40,
                  background: input.trim() && !loading ? "var(--accent-y)" : "var(--bg-elevated)",
                  color: input.trim() && !loading ? "#fff" : "var(--text-muted)",
                  border: "1px solid var(--border)",
                  fontSize: 18,
                  transition: "background 0.2s, color 0.2s",
                }}
                disabled={!input.trim() || loading}
              >
                {loading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{ display: "block", fontSize: 16 }}
                  >
                    ⟳
                  </motion.span>
                ) : (
                  "→"
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
