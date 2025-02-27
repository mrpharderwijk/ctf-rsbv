import clsx from 'clsx'
import type { Metadata, Viewport } from 'next'
import { Figtree } from 'next/font/google'
import { draftMode } from 'next/headers'
import { PropsWithChildren } from 'react'

import './globals.css'
import { Footer } from '@/components/molecules/footer/footer'
import { Header } from '@/components/molecules/header/header'
import { locales } from '@/features/i18n/utils/config'
import { initTranslations } from '@/features/i18n/utils/init-translations'
import { AppProvider } from '@/providers/app-provider/app-provider'
import { NextPageProps } from '@/types/next-page-props'

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    twitter: {
      card: 'summary_large_image',
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export async function generateStaticParams(): Promise<LayoutProps['params'][]> {
  return locales.map((locale) => Promise.resolve({ locale }))
}

const mainFont = Figtree({ subsets: ['latin'], variable: '--main-font' })

const allowedOriginList = [
  'https://app.contentful.com',
  'https://app.eu.contentful.com',
]

export type LayoutProps = PropsWithChildren<NextPageProps<unknown>>

export default async function RootLayout({ children, params }: LayoutProps) {
  const { isEnabled: preview } = await draftMode()
  const { locale } = await params
  const { resources } = await initTranslations({ locale })
  const translationProviderProps = { locale, resources }
  const contentfulPreviewProviderProps = {
    locale,
    enableInspectorMode: preview,
    enableLiveUpdates: preview,
    targetOrigin: allowedOriginList,
  }
  const appProviderProps = {
    contentfulPreviewProviderProps,
    translationProviderProps,
  }
  const bodyClassNames = clsx(
    'font-sans min-h-screen bg-white dark:bg-zinc-900',
    mainFont.variable,
  )

  return (
    // <html lang={locale} dir={dir(locale)}>
    <html lang={locale}>
      <head>
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
      </head>

      <body className={bodyClassNames}>
        <AppProvider {...appProviderProps}>
          <Header />
          <main className="pt-12 md:pt-20">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  )
}
