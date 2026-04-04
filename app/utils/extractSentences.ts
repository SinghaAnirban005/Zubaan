export const extractSentences = (data: any) => {
  const paragraphs =
    data?.results?.channels?.[0]?.alternatives?.[0]?.paragraphs?.paragraphs;

  if (!paragraphs) return [];

  return paragraphs.flatMap((p: any) =>
    p.sentences.map((s: any) => ({
      text: s.text,
      start: s.start,
      end: s.end,
    }))
  );
};