export interface ISignatureSegment {
  x: number;
  y: number;
  time: number;
  color: string;
}

export type signatureData = ISignatureSegment[][];
