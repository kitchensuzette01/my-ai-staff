'use client';

import { useEffect, useState } from 'react';
import InputForm from './InputForm';
import ResultBoard from './ResultBoard';
import { classifyOneLink, generatePlan } from '@/lib/generatePlan';
import { clearPlan, loadPlan, savePlan } from '@/lib/storage';
import type { PlannerInput, WeeklyPlan } from '@/lib/types';

let nextLinkId = 1;

export default function PlannerApp() {
  // Lazy-init from localStorage: safe because this component only mounts on
  // the client (dynamic import with ssr:false in page.tsx).
  const [plan, setPlan] = useState<WeeklyPlan | null>(() => loadPlan());
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (plan) savePlan(plan);
  }, [plan]);

  async function handleGenerate(input: PlannerInput) {
    setIsGenerating(true);
    const newPlan = await generatePlan(input);
    setPlan(newPlan);
    setIsGenerating(false);
  }

  function handleRetag(linkId: string, topicId: string) {
    setPlan((prev) =>
      prev
        ? {
            ...prev,
            classifiedLinks: prev.classifiedLinks.map((l) =>
              l.id === linkId ? { ...l, topicId, source: 'manual' } : l
            ),
          }
        : prev
    );
  }

  function handleDelete(linkId: string) {
    setPlan((prev) =>
      prev ? { ...prev, classifiedLinks: prev.classifiedLinks.filter((l) => l.id !== linkId) } : prev
    );
  }

  async function handleAddLink(url: string) {
    if (!plan) return;
    const classified = await classifyOneLink(url, plan.input.topics);
    const withId = { ...classified, id: `link-added-${nextLinkId++}` };
    setPlan((prev) => (prev ? { ...prev, classifiedLinks: [...prev.classifiedLinks, withId] } : prev));
  }

  function handleReset() {
    clearPlan();
    setPlan(null);
  }

  if (isGenerating) {
    return <p className="p-6 text-center text-gray-500">링크를 조회하고 분류하는 중입니다...</p>;
  }

  if (plan) {
    return (
      <ResultBoard
        plan={plan}
        onRetag={handleRetag}
        onDelete={handleDelete}
        onAddLink={handleAddLink}
        onReset={handleReset}
      />
    );
  }

  return <InputForm onGenerate={handleGenerate} />;
}
