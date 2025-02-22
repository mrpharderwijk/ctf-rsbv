export type ElementTag = {
  as?:
    | 'div'
    | 'span'
    | 'section'
    | 'aside'
    | 'header'
    | 'footer'
    | 'main'
    | 'article';
};

export type TextElementTag =
  | 'span'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label';

export type PropsWithTestId<T = unknown> = T & {
  'data-testid'?: string;
};
