import { classifyLinksByRule } from './classify';
import { scheduleTopicsToWeek } from './schedule';
import type { ClassifiedLink, OgMeta, PlannerInput, WeeklyPlan } from './types';

async function fetchOgMeta(url: string): Promise<OgMeta> {
  try {
    const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
    return await res.json();
  } catch {
    return { ok: false, title: null, image: null, favicon: null, fetchedAt: new Date().toISOString() };
  }
}

export async function classifyOneLink(
  url: string,
  topics: PlannerInput['topics']
): Promise<ClassifiedLink> {
  const og = await fetchOgMeta(url);
  const assignments = classifyLinksByRule(topics, [{ id: 'tmp', url, ogTitle: og.title }]);
  return { id: '', url, topicId: assignments.tmp, og, source: 'rule' };
}

export async function generatePlan(input: PlannerInput): Promise<WeeklyPlan> {
  const ogResults = await Promise.all(input.links.map((l) => fetchOgMeta(l.url)));

  const assignments = classifyLinksByRule(
    input.topics,
    input.links.map((l, i) => ({ id: l.id, url: l.url, ogTitle: ogResults[i].title }))
  );

  const classifiedLinks: ClassifiedLink[] = input.links.map((l, i) => ({
    id: l.id,
    url: l.url,
    topicId: assignments[l.id],
    og: ogResults[i],
    source: 'rule',
  }));

  return {
    createdAt: new Date().toISOString(),
    input,
    classifiedLinks,
    days: scheduleTopicsToWeek(input.topics),
    aiEnabled: false,
  };
}
