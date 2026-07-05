export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export const WEEKDAYS: { id: Weekday; label: string }[] = [
  { id: 'mon', label: '월' },
  { id: 'tue', label: '화' },
  { id: 'wed', label: '수' },
  { id: 'thu', label: '목' },
  { id: 'fri', label: '금' },
  { id: 'sat', label: '토' },
  { id: 'sun', label: '일' },
];

export interface SnsAccount {
  id: string;
  platform: string;
  name: string;
}

export interface Topic {
  id: string;
  title: string;
  keywords: string[];
}

export interface ReferenceLinkInput {
  id: string;
  url: string;
}

export interface PlannerInput {
  topics: Topic[];
  accounts: SnsAccount[];
  links: ReferenceLinkInput[];
}

export interface OgMeta {
  title: string | null;
  image: string | null;
  favicon: string | null;
  fetchedAt: string;
  ok: boolean;
}

export type ClassifySource = 'rule' | 'ai' | 'manual';

export interface ClassifiedLink {
  id: string;
  url: string;
  topicId: string;
  og: OgMeta;
  source: ClassifySource;
}

export interface DaySlot {
  day: Weekday;
  topicId: string | null;
}

export interface WeeklyPlan {
  createdAt: string;
  input: PlannerInput;
  classifiedLinks: ClassifiedLink[];
  days: DaySlot[];
  aiEnabled: boolean;
}

export interface StoredState {
  version: 1;
  plan: WeeklyPlan | null;
}
