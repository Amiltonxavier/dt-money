import { CircleArrowUp } from "lucide-react";
import * as Card from "../../components/Card";
import { type Transation, TransationType } from "../../type";
import { convertAmountToCurrency } from "../../utils";


type Props = {
    transation: Transation[]
    //service: ({ type }: TypeProps) => Promise<TransationDTO[]>
}

export function CardInComing({ transation }: Props) {

    const total = transation.filter(item => item.transationType.includes(TransationType.inComing)).reduce((acc, curr) => acc + curr.amount, 0)

    return (
        <Card.Root>
            <Card.Wrapper>
                <Card.Content title="Entrada" amount={convertAmountToCurrency(total)} signal="+" />
            </Card.Wrapper>
            <Card.Icon icon={CircleArrowUp} className="text-green-700" />
        </Card.Root>
    )
}
