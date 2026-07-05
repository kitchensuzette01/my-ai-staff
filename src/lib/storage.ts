import type { StoredState, WeeklyPlan } from './types';

const STORAGE_KEY = 'sns-planner:v1';

export function loadPlan(): WeeklyPlan | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: StoredState = JSON.parse(raw);
    if (parsed.version !== 1) return null;
    return parsed.plan;
  } catch {
    return null;
  }
}

export function savePlan(plan: WeeklyPlan | null): void {
  const state: StoredState = { version: 1, plan };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearPlan(): void {
  localStorage.removeItem(STORAGE_KEY);
}
