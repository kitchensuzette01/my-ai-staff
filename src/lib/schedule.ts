import { WEEKDAYS, type DaySlot, type Topic } from './types';

export function scheduleTopicsToWeek(topics: Topic[]): DaySlot[] {
  if (topics.length === 0) {
    return WEEKDAYS.map((w) => ({ day: w.id, topicId: null }));
  }
  return WEEKDAYS.map((w, i) => ({ day: w.id, topicId: topics[i % topics.length].id }));
}
