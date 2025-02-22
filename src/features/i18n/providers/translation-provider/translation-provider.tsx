'use client';

import { createInstance } from 'i18next';
import type { PropsWithChildren, ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';

import { type InitTranslationsProps, initTranslations } from '@/features/i18n/utils/init-translations';


export type TranslationProviderProps = PropsWithChildren<{
  locale: InitTranslationsProps['locale'];
  namespaces?: InitTranslationsProps['namespaces'];
  resources: InitTranslationsProps['resources'];
}>

export function TranslationProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationProviderProps): ReactElement {
  const i18n = createInstance();

  initTranslations({ locale, namespaces, i18nInstance: i18n, resources });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
