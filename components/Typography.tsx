"use client";

import React from "react";
import clsx from "clsx";

type TypographyVariant =
  | "display"
  | "h1"
  | "h2"
  | "body"
  | "bodyMuted"
  | "caption"
  | "label"
  | "button";

interface TypographyProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

const baseStyles = "font-sans leading-relaxed";

const variants: Record<TypographyVariant, string> = {
  display:
    "text-3xl font-bold leading-tight text-[color:var(--color-text-title)]",
  h1: "text-2xl font-semibold text-[color:var(--color-text-title)]",
  h2: "text-lg font-semibold text-[color:var(--color-text-title)]",

  body: "text-base text-[color:var(--color-text-body)]",
  bodyMuted: "text-sm text-[color:var(--color-text-muted)]",

  caption:
    "text-xs text-[color:var(--color-text-muted)] leading-snug",

  label:
    "text-xs font-medium uppercase tracking-wide text-[color:var(--color-text-icon)]",

  button:
    "text-sm font-semibold text-[color:var(--color-text-title)]",
};

export default function Typography({
  variant = "body",
  children,
  className,
  align = "left",
}: TypographyProps) {
  return (
    <p
      className={clsx(
        baseStyles,
        variants[variant],
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </p>
  );
}
