"use client";
import dynamic from "next/dynamic";

/* Chatbot is ~500 lines of client state + streaming — defer to after hydration */
const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });

export default function ChatbotLoader() {
  return <Chatbot />;
}
