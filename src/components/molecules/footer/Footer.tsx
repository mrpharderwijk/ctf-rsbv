'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { Container } from '@/components/atoms/container/container';
import { Divider } from '@/components/atoms/divider/divider';
// import { FooterList } from '@/components/molecules/footer/components/footer-list/footer-list';

import { FooterCopyright } from './components/footer-copyright/footer-copyright';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-t-gray-light bg-gray-lightest pt-8 lg:pt-10">
      <Container className="py-8">
        <h2 className="h4 mb-4">{t('footer.aboutUs')}</h2>
        <div className="max-w-4xl">{t('footer.description')}</div>

        <div className="mt-8">
          {t('footer.powerBy')}{' '}
          <Link
            href="https://www.contentful.com"
            rel="noopener noreferrer"
            target="_blank"
            className="text-blue500"
          >
            Contentful
          </Link>
        </div>
        {/* <FooterList /> */}

        <Divider />

        <FooterCopyright />
      </Container>
    </footer>
  );
};
