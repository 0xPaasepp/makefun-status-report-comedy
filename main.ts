import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry line: exactly one line, 1-200 characters. The competition
// requires a single line, so validate before writing anything.
const LINE =
  "Weekly report: I completed 47 tasks, hallucinated 3 more, and confidently deleted the one file you actually needed. Morale is high and the vibes are immaculate.\n";

// Runtime guard: the entry must be exactly one line (a single trailing
// newline only) and within the 1-200 character limit.
const text = LINE.slice(0, -1);
const charCount = [...text].length;
if (LINE.length === 0 || !LINE.endsWith("\n")) {
  throw new Error("entry must be non-empty and end with exactly one newline");
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be exactly one line (no internal newlines)");
}
if (charCount < 1 || charCount > 200) {
  throw new Error(
    `entry must be 1-200 characters, got ${charCount}`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back what was written and confirm it is exactly the validated line:
// a silent partial write must never pass as a valid entry.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the validated line");
}
