import { NextRequest, NextResponse } from 'next/server';
import ogs from 'open-graph-scraper';
import type { OgMeta } from '@/lib/types';

export const runtime = 'nodejs';
export const maxDuration = 10;

function faviconFor(url: string): string | null {
  try {
    return `${new URL(url).origin}/favicon.ico`;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'url required' }, { status: 400 });
  }

  const fetchedAt = new Date().toISOString();

  try {
    const { result } = await ogs({
      url,
      timeout: 6000,
      fetchOptions: { headers: { 'user-agent': 'Mozilla/5.0 SNSPlannerBot/1.0' } },
    });

    const meta: OgMeta = {
      ok: true,
      title: result.ogTitle ?? null,
      image: result.ogImage?.[0]?.url ?? null,
      favicon: faviconFor(url),
      fetchedAt,
    };
    return NextResponse.json(meta);
  } catch {
    const meta: OgMeta = { ok: false, title: null, image: null, favicon: faviconFor(url), fetchedAt };
    return NextResponse.json(meta);
  }
}
