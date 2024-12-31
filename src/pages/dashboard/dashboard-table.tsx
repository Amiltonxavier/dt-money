import { ExternalLink } from "lucide-react";
import * as Tables from "../../components/table";
import { IncomingOutComingBadge } from "../../components/ui/incoming-outcoming";
import { TranstiontypeBadge } from "../../components/ui/transtion-type";
import type { TransationDTO } from "../../type";
import { convertDate } from "../../utils";

interface Props {
    transation: TransationDTO[],
    handleSelectItem: (id: string) => void
}


export function Table({ transation, handleSelectItem }: Props) {
    return (
        <article className="rounded">
            <Tables.Root>
                <Tables.Tbody>
                    {transation.map((item) => (
                        <Tables.Row
                            key={item.$id}
                            className="hover:scale-105 duration-100"
                        >
                            <Tables.Cell className="font-semibold rounded-tl-md round-bl-md">
                                {item.description}
                            </Tables.Cell>
                            <Tables.Cell>
                                <TranstiontypeBadge transition={item.transationType} amount={item.amount} />
                            </Tables.Cell>
                            <Tables.Cell>
                                {item.category}
                            </Tables.Cell>
                            <Tables.Cell className="w-10">
                                <IncomingOutComingBadge transition={item.transationType} />
                            </Tables.Cell>
                            <Tables.Cell>
                                {convertDate(item.date)}
                            </Tables.Cell>
                            <Tables.Cell className="hover:text-blue-500 rounded-tr-md round-br-md">
                                <button
                                    type="button"
                                    className="ml-auto"
                                    onClick={() => handleSelectItem(item.$id)}>
                                    <ExternalLink />
                                </button>
                            </Tables.Cell>
                        </Tables.Row>
                    ))}
                </Tables.Tbody>
            </Tables.Root>
        </article>
    )
}
