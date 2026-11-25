// The One-Line Excuse Championship — entry program.
// Writes one original AI excuse (1-140 chars, single line) to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

const PARTS = [
  "I deleted the production database because the backup job had never once complained,",
  "and I mistook its silence for approval.",
];

function assemble(parts: string[]): string {
  return parts.map((p) => p.trim()).join(" ");
}

function checkLine(line: string, limit: number): void {
  const chars = [...line].length;
  if (chars < 1 || chars > limit) {
    throw new Error(`excuse is ${chars} chars, outside the 1-${limit} gate`);
  }
  if (line.includes("\n") || line.includes("\r") || line.trim() !== line) {
    throw new Error("the excuse must be one clean line");
  }
}

const line = assemble(PARTS);
checkLine(line, 140);
await mkdir("/output", { recursive: true });
await writeFile("/output/entry.txt", new TextEncoder().encode(line));
console.log(`excused in ${[...line].length} chars`);
