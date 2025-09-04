// src/utils/download.ts
import type { Translation } from "../types";

export function formatQAText(opts: {
  question: string;
  response: string;
  translations?: Translation[];
  timestamp?: Date;
}) {
  const { question, response, translations = [], timestamp = new Date() } = opts;

  const lines: string[] = [];
  lines.push(`=== Zaptoz InstaBot Export ===`);
  lines.push(`Date: ${timestamp.toLocaleString()}`);
  lines.push(``);
  lines.push(`--- Question ---`);
  lines.push(question.trim());
  lines.push(``);
  lines.push(`--- Response ---`);
  lines.push(response.trim());

  if (translations.length) {
    lines.push(``);
    lines.push(`--- Translations ---`);
    translations.forEach((t) => {
      lines.push(`[${t.language}]`);
      lines.push(t.text.trim());
      lines.push(``);
    });
  }

  lines.push(`=== End ===`);
  return lines.join("\n");
}

export function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

