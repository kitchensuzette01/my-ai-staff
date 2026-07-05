import type { Topic } from './types';

export interface ClassifiableLink {
  id: string;
  url: string;
  ogTitle: string | null;
}

export function classifyLinksByRule(
  topics: Topic[],
  links: ClassifiableLink[]
): Record<string, string> {
  const counts: Record<string, number> = Object.fromEntries(topics.map((t) => [t.id, 0]));
  const result: Record<string, string> = {};

  for (const link of links) {
    const haystack = `${link.url} ${link.ogTitle ?? ''}`.toLowerCase();
    let best = topics[0];
    let bestScore = -1;

    for (const topic of topics) {
      const keywords = [...topic.keywords, ...topic.title.split(/\s+/)];
      const score = keywords.filter((k) => k && haystack.includes(k.toLowerCase())).length;
      if (score > bestScore || (score === bestScore && counts[topic.id] < counts[best.id])) {
        best = topic;
        bestScore = score;
      }
    }

    result[link.id] = best.id;
    counts[best.id] += 1;
  }

  return result;
}
