'use client';

import { useState } from 'react';
import { DUMMY_INPUT } from '@/lib/dummyData';
import type { PlannerInput, SnsAccount, Topic, ReferenceLinkInput } from '@/lib/types';

interface FormTopic {
  id: string;
  title: string;
  keywordsText: string;
}

let nextId = 1;
function makeId(prefix: string) {
  return `${prefix}-${nextId++}`;
}

function topicsToForm(topics: Topic[]): FormTopic[] {
  return topics.map((t) => ({ id: t.id, title: t.title, keywordsText: t.keywords.join(', ') }));
}

interface InputFormProps {
  onGenerate: (input: PlannerInput) => void;
}

export default function InputForm({ onGenerate }: InputFormProps) {
  const [topics, setTopics] = useState<FormTopic[]>(() => [
    { id: makeId('topic'), title: '', keywordsText: '' },
    { id: makeId('topic'), title: '', keywordsText: '' },
  ]);
  const [savedAccounts, setSavedAccounts] = useState<SnsAccount[]>(() =>
    DUMMY_INPUT.accounts.map((a) => ({ ...a }))
  );
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [newAccountPlatform, setNewAccountPlatform] = useState('');
  const [newAccountName, setNewAccountName] = useState('');
  const [links, setLinks] = useState<ReferenceLinkInput[]>(() => [{ id: makeId('link'), url: '' }]);

  function addTopic() {
    if (topics.length >= 3) return;
    setTopics((prev) => [...prev, { id: makeId('topic'), title: '', keywordsText: '' }]);
  }
  function removeTopic(id: string) {
    if (topics.length <= 2) return;
    setTopics((prev) => prev.filter((t) => t.id !== id));
  }
  function updateTopic(id: string, patch: Partial<FormTopic>) {
    setTopics((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function addSavedAccount() {
    if (!newAccountPlatform.trim() && !newAccountName.trim()) return;
    const account: SnsAccount = {
      id: makeId('acc'),
      platform: newAccountPlatform.trim(),
      name: newAccountName.trim(),
    };
    setSavedAccounts((prev) => [...prev, account]);
    setSelectedAccountId(account.id);
    setNewAccountPlatform('');
    setNewAccountName('');
    setShowAddAccount(false);
  }

  function addLink() {
    setLinks((prev) => [...prev, { id: makeId('link'), url: '' }]);
  }
  function removeLink(id: string) {
    if (links.length <= 1) return;
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }
  function updateLink(id: string, url: string) {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, url } : l)));
  }

  function fillDummy() {
    setTopics(topicsToForm(DUMMY_INPUT.topics));
    setSelectedAccountId(savedAccounts[0]?.id ?? null);
    setLinks(DUMMY_INPUT.links.map((l) => ({ ...l })));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input: PlannerInput = {
      topics: topics
        .filter((t) => t.title.trim())
        .map((t) => ({
          id: t.id,
          title: t.title.trim(),
          keywords: t.keywordsText
            .split(',')
            .map((k) => k.trim())
            .filter(Boolean),
        })),
      accounts: savedAccounts.filter((a) => a.id === selectedAccountId),
      links: links.filter((l) => l.url.trim()),
    };
    onGenerate(input);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">SNS 콘텐츠 플래너</h1>
        <button
          type="button"
          onClick={fillDummy}
          className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
        >
          더미 데이터 채우기
        </button>
      </div>

      <section className="space-y-3">
        <h2 className="font-semibold">SNS 계정 정보</h2>
        <div className="flex flex-wrap gap-2">
          {savedAccounts.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setSelectedAccountId(a.id)}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                selectedAccountId === a.id
                  ? 'border-lime-500 bg-lime-300 font-medium text-black'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              {a.platform} · {a.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowAddAccount(true)}
            className="rounded-full border border-dashed border-gray-400 px-3 py-1.5 text-sm text-blue-600"
          >
            + 새 계정
          </button>
        </div>
        {showAddAccount && (
          <div className="flex gap-2">
            <input
              value={newAccountPlatform}
              onChange={(e) => setNewAccountPlatform(e.target.value)}
              placeholder="플랫폼 (예: 인스타그램)"
              className="w-1/2 rounded border border-gray-300 px-3 py-2 text-sm"
            />
            <input
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
              placeholder="계정명 (예: @mieun_service)"
              className="w-1/2 rounded border border-gray-300 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={addSavedAccount}
              className="rounded bg-blue-600 px-3 text-sm text-white"
            >
              계정 추가
            </button>
          </div>
        )}
        {selectedAccountId && (
          <p className="text-xs text-gray-500">
            현재 선택: {savedAccounts.find((a) => a.id === selectedAccountId)?.platform} ·{' '}
            {savedAccounts.find((a) => a.id === selectedAccountId)?.name}
          </p>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold">주제 (2~3개)</h2>
        {topics.map((t, i) => (
          <div key={t.id} className="flex gap-2">
            <input
              value={t.title}
              onChange={(e) => updateTopic(t.id, { title: e.target.value })}
              placeholder={`주제 ${i + 1} (예: 신규 서비스 소개)`}
              className="w-1/2 rounded border border-gray-300 px-3 py-2 text-sm"
            />
            <input
              value={t.keywordsText}
              onChange={(e) => updateTopic(t.id, { keywordsText: e.target.value })}
              placeholder="키워드 (쉼표로 구분)"
              className="w-1/2 rounded border border-gray-300 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => removeTopic(t.id)}
              disabled={topics.length <= 2}
              className="rounded border border-gray-300 px-2 text-sm disabled:opacity-30"
            >
              삭제
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTopic}
          disabled={topics.length >= 3}
          className="text-sm text-blue-600 disabled:opacity-30"
        >
          + 주제 추가
        </button>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold">레퍼런스 링크</h2>
        {links.map((l, i) => (
          <div key={l.id} className="flex gap-2">
            <input
              value={l.url}
              onChange={(e) => updateLink(l.id, e.target.value)}
              placeholder={`링크 ${i + 1} URL`}
              className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => removeLink(l.id)}
              disabled={links.length <= 1}
              className="rounded border border-gray-300 px-2 text-sm disabled:opacity-30"
            >
              삭제
            </button>
          </div>
        ))}
        <button type="button" onClick={addLink} className="text-sm text-blue-600">
          + 링크 추가
        </button>
      </section>

      <button
        type="submit"
        className="w-full rounded bg-lime-300 py-2.5 font-semibold text-black hover:bg-lime-400"
      >
        생성하기
      </button>
    </form>
  );
}
