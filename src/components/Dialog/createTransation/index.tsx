import { type FormEvent, useState } from "react";
import { Dialog } from "..";
import { type Transation, TransationType } from "../../../type";
import { ArrowDown, ArrowUp, CheckCircle2, DollarSign } from "lucide-react";
import { CONSTANTS } from "../../../constants";
import * as Input from "../../form/Input";
import * as Select from "../../form/Select";
import { Root } from "../../form/Root";
import { Label } from "../../form/Label";
import { useUser } from "../../../context/user";

type Props = {
  onClose: () => void;
  onCreateTransation: (newTransations: Transation) => void;
};

export function DialogCreateTransation({ onClose, onCreateTransation }: Props) {
  const [selectedType, setSelectedType] = useState<TransationType>(
    TransationType.inComing,
  );
  const { user } = useUser();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newTransations = {
      description: formData.get("name") as string,
      category: formData.get("category") as string,
      date: new Date(),
      transationType: formData.get("transationType") as TransationType,
      amount: Number(formData.get("amount")) as number,
      userId: user?.$id as string,
    };

    onCreateTransation(newTransations);
  }

  function handleChangeSelectedType(type: TransationType) {
    setSelectedType(type);
  }

  return (
    <Dialog onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h4 className="font-semibold text-xl">Transação</h4>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Root>
            <Label>Descrição</Label>
            <Input.Control
              type="text"
              name="name"
              id="name"
              placeholder="Descrição da Transação"
              className="focus-within:ring-2 ring-blue-500"
            />
          </Root>

          <Root>
            <Label htmlFor="category">Categoria</Label>
            <Select.Trigger name="category" id="category">
              <Select.Option>
                {" "}
                Seleciona uma categoria para a transação
              </Select.Option>
              {CONSTANTS.CATEGORY.map((item) => (
                <Select.Option key={item.id} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select.Trigger>
          </Root>
          <Input.Root>
            <Input.Label>Quantia</Input.Label>
            <Input.Wrapper>
              <Input.Icon icon={DollarSign} />
              <Input.Control
                type="number"
                min={0}
                name="amount"
                id="amount"
                placeholder="Valor de entrada"
                className=""
              />
            </Input.Wrapper>
          </Input.Root>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="cursor-pointer" id="transationType">
              <input
                type="radio"
                className="peer sr-only"
                name="transationType"
                id="transationType"
                value={TransationType.inComing}
                checked={selectedType === TransationType.inComing}
                onChange={() =>
                  handleChangeSelectedType(TransationType.inComing)
                }
              />
              <div className="rounded-md p-4 text-gray-700 ring-2 ring-transparent hover:shadow peer-checked:text-gray-100 peer-checked:bg-green-700  peer-checked:border-none border border-zinc-700 outline-none duration-200 transition-colors ">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase  peer-checked:text-gray-100 flex justify-center gap-2">
                      <ArrowUp className="size-4 text-green-700 peer-checked:text-gray-100" />
                      <span>Entrada</span>
                    </p>
                    <div>
                      <CheckCircle2 className="size-6" />
                    </div>
                  </div>
                </div>
              </div>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                className="peer sr-only"
                name="transationType"
                value={TransationType.outComing}
                checked={selectedType === TransationType.outComing}
                onChange={() =>
                  handleChangeSelectedType(TransationType.outComing)
                }
              />
              <div className="rounded-md p-4 text-gray-700 ring-2 ring-transparent  hover:shadow peer-checked:text-gray-100 peer-checked:bg-green-700 peer-checked:border-none border border-zinc-700 outline-none transition-colors">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase flex justify-center gap-2">
                      <ArrowDown className="size-4 text-red-700" />
                      <span>Saída</span>
                    </p>
                    <div className=" peer-checked:">
                      <CheckCircle2 className="size-6" />
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="mt-2 px-2 py-3 outline-none focus-within:ring-2 focus-within:ring-blue-500 ring-0 bg-green-700 rounded text-gray-100 w-full block font-bold"
            >
              Cria nova transação
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
