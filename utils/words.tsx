// Set to store bad words
const badWords = new Set<string>();

// Load words from CSV file at startup
try {
  const text = await Deno.readTextFileSync("./utils/words.csv");
  const words = text.split(",").map(word => word.trim().toLowerCase());
  words.forEach(word => badWords.add(word));
} catch (error) {
  console.error("Error loading words.csv:", error);
}

/**
 * Check if a word is in the bad words set
 * @param word Word to check
 * @returns true if word is in bad words set, false otherwise
 */
export function isBlockedWord(word: string): boolean {
  return badWords.has(word.toLowerCase());
}

/**
 * Filter out bad words from text
 * @param text Text to filter
 * @returns Filtered text with bad words removed
 */
export function filterText(text: string): string {
  return text
    .split(" ")
    .filter(word => !isBlockedWord(word))
    .join(" ");
}
