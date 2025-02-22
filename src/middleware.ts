import { i18nRouter } from 'next-i18n-router';
import type { NextRequest } from 'next/server';

import { defaultLocale, locales } from '@/features/i18n/utils/config';

export function middleware(request: NextRequest) {
  const config = { defaultLocale, locales }
  return i18nRouter(request, config);
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
