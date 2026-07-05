import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const PAYMENT_URL = 'https://www.groble.im/payment/npLPJA';
const SITE_URL = 'https://my-ai-staff.vercel.app';

const TITLE = 'SNS 콘텐츠 플래너 — 주제와 링크만 넣으면 요일별 콘텐츠 캘린더 완성';
const DESCRIPTION =
  '이번 주 주제와 레퍼런스 링크만 넣으면 AI가 자동으로 태그하고 요일별 콘텐츠 캘린더로 정리해드려요. 1인 크리에이터·SNS 대행사를 위한 무료 도구.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/landing/planner-preview.png`],
  },
};

const PRIMARY_CTA_CLASS =
  'inline-block rounded bg-lime-300 px-6 py-3 text-center text-base font-semibold text-black hover:bg-lime-400 sm:text-lg';
const SECONDARY_CTA_CLASS =
  'inline-block rounded bg-blue-600 px-6 py-3 text-center text-base font-semibold text-white hover:bg-blue-700';

function Hero() {
  return (
    <section className="mx-auto max-w-3xl space-y-6 px-6 pt-16 pb-12 text-center">
      <span className="inline-block rounded-full border border-gray-300 px-3 py-1.5 text-sm">
        1인 크리에이터 · SNS 대행사를 위한 도구
      </span>
      <h1 className="text-2xl font-bold sm:text-4xl">
        오늘도 팀원한테
        <br />
        &ldquo;다음에 뭐 올려요?&rdquo; 라는 질문 받으셨나요?
      </h1>
      <p className="text-gray-500 sm:text-lg">
        이번 주 주제와 레퍼런스 링크 10개만 넣으면, AI가 자동으로 태그하고
        요일별 콘텐츠 캘린더로 정리해드려요.
      </p>
      <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
        <Link href="/" className={PRIMARY_CTA_CLASS}>
          무료로 지금 써보기
        </Link>
        <a
          href={PAYMENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={SECONDARY_CTA_CLASS}
        >
          지금 구매하기
        </a>
      </div>
    </section>
  );
}

const PAIN_POINTS = [
  '여러 SNS 계정을 관리하다 보면 콘텐츠 아이디어가 금방 바닥나요',
  '레퍼런스 링크는 쌓이는데, 주제별로 정리할 시간이 없어요',
  '팀원이나 클라이언트가 매번 "오늘 뭐 올려요?" 라고 물어봐요',
];

function PainPoints() {
  return (
    <section className="mx-auto max-w-3xl space-y-6 px-6 py-12">
      <h2 className="text-center text-xl font-bold">
        이런 고민, 익숙하지 않으세요?
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {PAIN_POINTS.map((text) => (
          <div key={text} className="rounded border border-gray-200 p-4 text-sm text-gray-600">
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  '이번 주 주제 2~3개 + 레퍼런스 링크 최대 10개 입력',
  'AI가 링크를 주제별로 자동 태그하고 썸네일까지 가져와요',
  '요일별 콘텐츠 캘린더 완성 — 태그 수정, 링크 추가/삭제도 자유롭게',
];

function HowItWorks() {
  return (
    <section className="mx-auto max-w-3xl space-y-6 px-6 py-12">
      <h2 className="text-center text-xl font-bold">3분이면 충분해요</h2>
      <ol className="space-y-4">
        {STEPS.map((text, i) => (
          <li key={text} className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime-300 font-bold text-black">
              {i + 1}
            </span>
            <p className="pt-1 text-sm text-gray-600 sm:text-base">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ScreenshotPreview() {
  return (
    <section className="mx-auto max-w-3xl space-y-3 px-6 py-12 text-center">
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <Image
          src="/landing/planner-preview.png"
          alt="SNS 콘텐츠 플래너 실제 화면"
          width={1280}
          height={720}
          className="h-auto w-full"
        />
      </div>
      <p className="text-sm text-gray-500">
        실제 화면: 주제와 링크만 넣으면 이렇게 나와요
      </p>
    </section>
  );
}

function RepeatCta() {
  return (
    <section className="mx-auto max-w-3xl space-y-4 px-6 py-12 text-center">
      <h2 className="text-xl font-bold">
        지금 바로 3분 만에 이번 주 콘텐츠 계획을 만들어보세요
      </h2>
      <Link href="/" className={PRIMARY_CTA_CLASS}>
        무료로 써보기 →
      </Link>
    </section>
  );
}

function PurchaseCta() {
  return (
    <section className="mx-auto max-w-3xl space-y-4 px-6 py-12 text-center">
      <h2 className="text-xl font-bold">제대로 써보고 싶으신가요?</h2>
      <p className="text-gray-500">
        정식 버전을 구매하면 계속해서 편하게 이용하실 수 있어요.
      </p>
      <a
        href={PAYMENT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={SECONDARY_CTA_CLASS}
      >
        지금 구매하기
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-3xl space-y-2 px-6 py-10 text-center text-xs text-gray-400">
      <div className="flex justify-center gap-4">
        <Link href="/" className="text-blue-600">
          앱 체험하기
        </Link>
        <a
          href={PAYMENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600"
        >
          구매하기
        </a>
      </div>
      <p>© 2026 SNS 콘텐츠 플래너</p>
    </footer>
  );
}

export default function IntroPage() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <HowItWorks />
      <ScreenshotPreview />
      <RepeatCta />
      <PurchaseCta />
      <Footer />
    </main>
  );
}
