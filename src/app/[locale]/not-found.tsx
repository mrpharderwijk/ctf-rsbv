import { headers } from 'next/headers';
import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

import { Container } from '@/components/atoms/container/container';
import { defaultLocale } from '@/features/i18n/utils/config';
import { initTranslations } from '@/features/i18n/utils/init-translations';


export default async function NotFound() {
  const headersList = await headers();
  const locale = headersList.get('x-next-i18n-router-locale') || defaultLocale;
  const { t } = await initTranslations({ locale });

  return (
    <Container>
      <title>{t('notFound.title')}</title>
      <h1 className="h2">{t('notFound.title')}</h1>
      <p className="mt-4">
        <Trans i18nKey="notFound.description" t={t}>
          <Link className="text-blue500" href="/" />
        </Trans>
      </p>
    </Container>
  );
}
