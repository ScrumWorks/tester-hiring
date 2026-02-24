export function getBioCharCount(text: string): number {
  return text.replace(/\n/g, "\n\n").length;
}
