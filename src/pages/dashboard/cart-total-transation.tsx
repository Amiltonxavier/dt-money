import { ArrowRightLeft, CircleArrowUp, DollarSign } from "lucide-react";
import * as Card from "../../components/Card";
import { useEffect, useState } from "react";
import { type TransationDTO, TransationType } from "../../type";
import { convertAmountToCurrency } from "../../utils";

type Props = {
  transation: TransationDTO[];
};

export function CardTotalTransation({ transation }: Props) {
  const total = transation.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <Card.Root>
      <Card.Wrapper>
        <Card.Content
          title={"Total de Transações"}
          amount={convertAmountToCurrency(total)}
        />
      </Card.Wrapper>
      <Card.Icon icon={ArrowRightLeft} className="text-zinc-100" />
    </Card.Root>
  );
}
