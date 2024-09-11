import { Dialog } from "..";
import type { Transation } from "../../../type";
import { convertDate } from "../../../utils";
import { IncomingOutComingBadge } from "../../ui/incoming-outcoming";
import { TranstiontypeBadge } from "../../ui/transtion-type";


type DialogDetailsProps = {
    onClose: () => void;
    data: Transation
};

export function DialogDetails({
    onClose,
    data
}: DialogDetailsProps) {


    return (
        <Dialog onClose={onClose}>
            <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl tracking-tighter">Ver Transação</h4>
                <div className="flex w-full">
                    <dl className="grid grid-cols-2 items-start gap-4">
                        <dt className="font-bold">Identificador</dt>
                        <dd className="">{data.id}</dd>
                        <dt className="font-bold">Descrição</dt>
                        <dd className=" block">{data.description}</dd>
                        <dt className="font-bold">Categoria</dt>
                        <dd className=" block">{data.category}</dd>
                        <dt className="font-bold">Tipo Transação</dt>
                        <dd className=" block">{<IncomingOutComingBadge transition={data.transationType} />}</dd>
                        <dt className="font-bold">Montante</dt>
                        <dd className="">
                            <TranstiontypeBadge
                                amount={data.amount}
                                transition={data.transationType}
                            />
                        </dd>
                        <dt className="font-bold">Data</dt>
                        <dd className="">{convertDate(data.date)}</dd>
                    </dl>
                </div>
            </div>
        </Dialog>
    );
}