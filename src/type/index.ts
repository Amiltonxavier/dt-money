import type { Models } from "appwrite";
export enum TransationType {
  inComing = "inComing",
  outComing = "outComing",
}
export type Transation = {
  description: string;
  category: string;
  date: Date;
  transationType: TransationType;
  amount: number;
  userId: string;
};
export type TransationDTO = Transation & Models.Document;
