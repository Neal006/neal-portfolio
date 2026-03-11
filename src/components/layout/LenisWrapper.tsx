"use client";
import { useLenis } from "@/hooks/useLenis";

export default function LenisWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis();
  return <>{children}</>;
}
