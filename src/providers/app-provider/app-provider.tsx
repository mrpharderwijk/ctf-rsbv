import { PropsWithChildren, ReactElement } from 'react'

import {
  ContentfulPreviewProvider,
  ContentfulPreviewProviderProps,
} from '@/features/contentful/providers/contentful-preview-provider/contentful-preview-provider'
import {
  TranslationProvider,
  TranslationProviderProps,
} from '@/features/i18n/providers/translation-provider/translation-provider'

type AppProviderProps = PropsWithChildren<{
  translationProviderProps: TranslationProviderProps
  contentfulPreviewProviderProps: ContentfulPreviewProviderProps
}>

export function AppProvider({
  children,
  translationProviderProps,
  contentfulPreviewProviderProps,
}: AppProviderProps): ReactElement {
  return (
    <>
      <TranslationProvider {...translationProviderProps}>
        <ContentfulPreviewProvider {...contentfulPreviewProviderProps}>
          {children}
        </ContentfulPreviewProvider>
      </TranslationProvider>
    </>
  )
}
