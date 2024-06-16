export enum TransationType {
    inComing= "Entrada",
    outComing="Saída"
}


export type Transation = {
    id: number | string,
    description: string,
    category: string,
    date: Date,
    transationType: TransationType,
    amount: number
}