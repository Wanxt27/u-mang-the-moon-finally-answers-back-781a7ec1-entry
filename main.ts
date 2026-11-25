// The Moon Finally Answers Back — make.fun entry.
// Writes the Moon's one-line comeback to /output/entry.txt. Node 22, stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The line: four billion years of wishes, howls and late-night promises,
// answered in one breath — wry, old, a little tired, and the turn lands
// on the last words.
const line =
  "Four billion years of wishes, howls and 2 a.m. promises — and not one of you ever wished me good night.";

// Gate: the sealed scorer only accepts UTF-8 text of 1 to 240 characters,
// not only whitespace, on a single line. The count is characters, not
// bytes, so a multi-byte dash costs one character.
const chars = [...line].length;
const bytes = Buffer.byteLength(line, "utf8");
if (
  chars < 1 ||
  chars > 240 ||
  line.includes("\n") ||
  line.trim().length === 0
) {
  throw new Error(`line fails the gate (${chars} chars, ${bytes} bytes)`);
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file is exactly the line, and a smaller text
// wins the tie-break, so nothing extra is written.
writeFileSync("/output/entry.txt", line, "utf8");

// Read back what was written: the file the judge sees must be the line,
// byte for byte, with nothing extra — same text and same byte length.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== line || Buffer.byteLength(written, "utf8") !== bytes) {
  throw new Error("entry.txt does not match the line");
}
