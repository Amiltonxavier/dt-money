import { CircleArrowDown } from "lucide-react";
import * as Card from "../../components/Card";
import { useEffect, useState } from "react";
import { Transation, TransationType } from "../../type";
import { convertAmountToCurrency } from "../../utils";

type Props = {
    transation: Transation[]
}

export function CardOutComing({ transation }: Props) {
    const total = transation.filter(item => item.transationType.includes(TransationType.outComing)).reduce((acc, curr) => acc + curr.amount, 0)

    return (
        <Card.Root>
            <Card.Wrapper>
                <Card.Content title="Saída" amount={convertAmountToCurrency(total)} signal="-" />
            </Card.Wrapper>
            <Card.Icon icon={CircleArrowDown} className="text-red-700" />
        </Card.Root>
    )
}
