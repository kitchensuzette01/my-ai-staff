import LinkThumb from './LinkThumb';
import type { ClassifiedLink, DaySlot, Topic } from '@/lib/types';
import { WEEKDAYS } from '@/lib/types';

interface DayColumnProps {
  day: DaySlot;
  topics: Topic[];
  links: ClassifiedLink[];
  onRetag: (linkId: string, topicId: string) => void;
  onDelete: (linkId: string) => void;
}

export default function DayColumn({ day, topics, links, onRetag, onDelete }: DayColumnProps) {
  const label = WEEKDAYS.find((w) => w.id === day.day)?.label ?? day.day;
  const topic = topics.find((t) => t.id === day.topicId);
  const dayLinks = links.filter((l) => l.topicId === day.topicId);

  return (
    <div className="min-w-0 rounded-lg border border-gray-200 p-3">
      <div className="mb-2">
        <span className="text-sm font-bold text-gray-500">{label}요일</span>
        <div className="font-semibold">{topic?.title ?? '주제 없음'}</div>
      </div>
      <div className="space-y-2">
        {dayLinks.length === 0 && <p className="text-xs text-gray-400">배정된 링크 없음</p>}
        {dayLinks.map((link) => (
          <LinkThumb key={link.id} link={link} topics={topics} onRetag={onRetag} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
