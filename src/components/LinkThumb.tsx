'use client';

import { useState } from 'react';
import type { ClassifiedLink, Topic } from '@/lib/types';

function initialStage(link: ClassifiedLink): number {
  if (link.og.image) return 0;
  if (link.og.favicon) return 1;
  return 2;
}

function srcForStage(link: ClassifiedLink, stage: number): string {
  if (stage === 0 && link.og.image) return link.og.image;
  if (stage <= 1 && link.og.favicon) return link.og.favicon;
  return '/placeholder-thumbnail.svg';
}

interface LinkThumbProps {
  link: ClassifiedLink;
  topics: Topic[];
  onRetag: (linkId: string, topicId: string) => void;
  onDelete: (linkId: string) => void;
}

export default function LinkThumb({ link, topics, onRetag, onDelete }: LinkThumbProps) {
  const [stage, setStage] = useState(() => initialStage(link));

  return (
    <div data-link-id={link.id} className="space-y-1.5 rounded border border-gray-200 p-2 text-sm">
      <div className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={srcForStage(link, stage)}
          alt=""
          width={48}
          height={32}
          className="h-8 w-12 shrink-0 rounded object-cover bg-gray-100"
          onError={() => setStage((s) => Math.min(s + 1, 2))}
        />
        <div className="min-w-0 flex-1">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate font-medium text-blue-700 hover:underline"
          >
            {link.og.title || link.url}
          </a>
          <div className="truncate text-xs text-gray-400">{link.url}</div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <select
          value={link.topicId}
          onChange={(e) => onRetag(link.id, e.target.value)}
          className="min-w-0 flex-1 rounded border border-gray-300 px-1 py-1 text-xs"
        >
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => onDelete(link.id)}
          className="shrink-0 rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-100"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
