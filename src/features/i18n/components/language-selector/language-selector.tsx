'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSelectorDesktop } from '@/features/i18n/components/language-selector/components/language-selector-desktop/language-selector-desktop';
import { LanguageSelectorMobile } from '@/features/i18n/components/language-selector/components/language-selector-mobile/language-selector-mobile';
import { defaultLocale, locales } from '@/features/i18n/utils/config';

const localeName = locale => locale.split('-')[0];

const displayName = locale =>
  new Intl.DisplayNames([locale], {
    type: 'language',
  });

const isChangeEvent = (event: SyntheticEvent): event is React.ChangeEvent<HTMLSelectElement> => {
  return event.type === 'change';
};

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleLocaleChange: React.EventHandler<React.SyntheticEvent> = e => {
    let newLocale: string | undefined = undefined;

    if (isChangeEvent(e)) {
      newLocale = e.target.value;
    }

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // redirect to the new locale path
    if (currentLocale === defaultLocale) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    router.refresh();
  };

  return locales && locales.length > 1 ? (
    <>
      <div className="hidden md:block">
        <LanguageSelectorDesktop
          displayName={displayName}
          onChange={handleLocaleChange}
          localeName={localeName}
        />
      </div>

      <div className="block md:hidden">
        <LanguageSelectorMobile
          displayName={displayName}
          onChange={handleLocaleChange}
          localeName={localeName}
        />
      </div>
    </>
  ) : null;
};
