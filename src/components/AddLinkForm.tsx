'use client';

import { useState } from 'react';

interface AddLinkFormProps {
  onAdd: (url: string) => Promise<void>;
}

export default function AddLinkForm({ onAdd }: AddLinkFormProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    try {
      await onAdd(url.trim());
      setUrl('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="추가할 링크 URL"
        className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded bg-lime-300 px-4 py-2 text-sm font-medium text-black hover:bg-lime-400 disabled:opacity-50"
      >
        {loading ? '조회 중...' : '링크 추가'}
      </button>
    </form>
  );
}
