import AddLinkForm from './AddLinkForm';
import DayColumn from './DayColumn';
import type { WeeklyPlan } from '@/lib/types';

interface ResultBoardProps {
  plan: WeeklyPlan;
  onRetag: (linkId: string, topicId: string) => void;
  onDelete: (linkId: string) => void;
  onAddLink: (url: string) => Promise<void>;
  onReset: () => void;
}

export default function ResultBoard({ plan, onRetag, onDelete, onAddLink, onReset }: ResultBoardProps) {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">주간 콘텐츠 계획표</h1>
        <button
          type="button"
          onClick={onReset}
          className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
        >
          새로 만들기
        </button>
      </div>

      <AddLinkForm onAdd={onAddLink} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {plan.days.map((day) => (
          <DayColumn
            key={day.day}
            day={day}
            topics={plan.input.topics}
            links={plan.classifiedLinks}
            onRetag={onRetag}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
