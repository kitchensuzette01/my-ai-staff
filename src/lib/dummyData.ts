import type { PlannerInput } from './types';

export const DUMMY_INPUT: PlannerInput = {
  topics: [
    { id: 'topic-service', title: '신규 서비스 소개', keywords: ['서비스', '소개', '출시', '안내'] },
    { id: 'topic-review', title: '고객 후기', keywords: ['후기', '고객', '소비자', '리뷰'] },
    { id: 'topic-event', title: '이벤트·프로모션', keywords: ['이벤트', '프로모션', '판촉', '할인', '쿠폰'] },
  ],
  accounts: [
    { id: 'acc-ig', platform: '인스타그램', name: '@mieun_service' },
    { id: 'acc-blog', platform: '네이버블로그', name: '미은서비스 블로그' },
  ],
  links: [
    { id: 'link-1', url: 'https://ko.wikipedia.org/wiki/서비스' },
    { id: 'link-2', url: 'https://ko.wikipedia.org/wiki/소셜_네트워크_서비스' },
    { id: 'link-3', url: 'https://ko.wikipedia.org/wiki/브랜드' },
    { id: 'link-4', url: 'https://ko.wikipedia.org/wiki/마케팅' },
    { id: 'link-5', url: 'https://ko.wikipedia.org/wiki/소비자' },
    { id: 'link-6', url: 'https://ko.wikipedia.org/wiki/고객관계관리' },
    { id: 'link-7', url: 'https://ko.wikipedia.org/wiki/이벤트' },
    { id: 'link-8', url: 'https://ko.wikipedia.org/wiki/판촉' },
    { id: 'link-9', url: 'https://ko.wikipedia.org/wiki/쿠폰' },
    { id: 'link-10', url: 'https://ko.wikipedia.org/wiki/인스타그램' },
  ],
};
