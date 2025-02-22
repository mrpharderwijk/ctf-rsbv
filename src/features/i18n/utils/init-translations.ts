import { createInstance, type i18n, type InitOptions } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { defaultLocale, locales } from './config';

export interface InitTranslationsProps {
  i18nInstance?: i18n;
  locale: string;
  namespaces?: string[];
  resources?: InitOptions['resources'];
}

export async function initTranslations({
  i18nInstance,
  locale,
  namespaces = ['common'],
  resources,
}: InitTranslationsProps) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language, namespace) => import(`../../../../public/locales/${language}/${namespace}.json`),
      ),
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: defaultLocale,
    supportedLngs: locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : locales,
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}
