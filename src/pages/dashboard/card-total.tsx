import { DollarSign } from "lucide-react";
import * as Card from "../../components/Card";
import { TransationType, type Transation } from "../../type";
import { convertAmountToCurrency } from "../../utils";

type Props = {
  transation: Transation[];
};

export function CardTotal({ transation }: Props) {
  //const total = transation.reduce((acc, curr) => acc + Number(curr.amount), 0);

  const outComing = transation
    .filter((item) => item.transationType.includes(TransationType.outComing))
    .reduce((acc, curr) => acc + curr.amount, 0);
  const inComing = transation
    .filter((item) => item.transationType.includes(TransationType.inComing))
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <Card.Root className="bg-green-700">
      <Card.Wrapper>
        <Card.Content
          title={"Saldo"}
          amount={convertAmountToCurrency(inComing - outComing)}
          className="text-gray-100"
        />
      </Card.Wrapper>
      <Card.Icon icon={DollarSign} className="text-zinc-100" />
    </Card.Root>
  );
}
