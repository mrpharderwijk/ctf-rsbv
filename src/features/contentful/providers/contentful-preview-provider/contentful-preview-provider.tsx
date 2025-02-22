'use client';

import { ContentfulLivePreviewInitConfig } from '@contentful/live-preview';
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import { PropsWithChildren, ReactElement } from 'react';

export type ContentfulPreviewProviderProps = PropsWithChildren<ContentfulLivePreviewInitConfig>

export function ContentfulPreviewProvider({
  children,
  ...props
}: ContentfulPreviewProviderProps): ReactElement {
  return <ContentfulLivePreviewProvider {...props}>{children}</ContentfulLivePreviewProvider>;
}
