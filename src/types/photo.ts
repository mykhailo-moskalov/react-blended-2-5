export interface IPhoto {
  id: number;
  avg_color: string;
  alt: string;
  src: ISrc;
}

interface ISrc {
  large: string;
  original: string;
}
