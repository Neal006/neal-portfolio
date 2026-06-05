"use client";
import dynamic from "next/dynamic";

/* These components only make sense on the client (cursor, scroll tracking).
   Keeping the dynamic call inside a Client Component satisfies Next.js 16. */
const CustomCursor   = dynamic(() => import("./CustomCursor"),   { ssr: false });
const ScrollProgress = dynamic(() => import("./ScrollProgress"), { ssr: false });

export default function ClientShell() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
    </>
  );
}
