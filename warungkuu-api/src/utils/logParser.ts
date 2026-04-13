// utils/logParser.ts
export const parseLogLine = (line: string) => {
  const regex = /\[(.*?)\] (\w+): (.*?)(?: \| (.*))?$/;
  const match = line.match(regex);

  if (!match) return null;

  const [, timestamp, level, message, meta] = match;

  let parsedMeta = {};

  try {
    parsedMeta = meta ? JSON.parse(meta) : {};
  } catch (error) {
    parsedMeta = { rawMeta: meta }; // fallback kalau JSON rusak
  }

  return {
    timestamp,
    level,
    message,
    ...parsedMeta,
  };
};
