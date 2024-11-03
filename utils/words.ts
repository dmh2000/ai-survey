export default function word_clean(text: string) {
  const words = text.split(" ");
  return words.filter((w) => w !== "fuck").join(" ");
}
