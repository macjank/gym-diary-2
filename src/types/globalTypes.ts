export enum Lang {
  PL = 'pl',
  EN = 'en',
}

export interface Translation {
  lang: string;
  value: string;
}

export interface MultilangString {
  lang: string;
  value: string;
}
