import { FormEvent, useState } from "react";
import { Dialog } from "..";
import { Transation, TransationType } from "../../../type";
import { ArrowDown, ArrowUp, CheckCircle2, DollarSign } from "lucide-react";
import { CONSTANTS } from "../../../constants";

type DialogTaskProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateTransation: (newTransations: Transation) => void;
};

export function DialogCreatTask({
  isOpen,
  onClose,
  onCreateTransation,
}: DialogTaskProps) {
  const [selectedType, setSelectedType] = useState<TransationType>(
    TransationType.inComing
  );
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newTransations = {
      id: Math.round((Math.random() * 100) / 2),
      description: formData.get("name") as string,
      category: formData.get("category") as string,
      date: new Date(),
      transationType: formData.get("transationType") as TransationType, 
      amount: Number(formData.get("amount")) as number,
    };

    onCreateTransation(newTransations);
  }

  function handleChangeSelectedType(type: TransationType) {
    setSelectedType(type);
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h4 className="font-semibold text-xl">Transação</h4>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Descrição</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Descrição da Transação"
              className="w-full p-2 bg-transparent border border-zinc-700 rounded ring-0 focus-within:ring-2 focus-within:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="category">Categoria</label>
            <select
              name="category"
              id="category"
              className="p-2 rounded bg-transparent ring-0 focus-within:ring-2 focus-within:ring-blue-500 border border-zinc-700 outline-none"
            >
              <option disabled selected>
                Seleciona uma categoria para a transação
              </option>
              {CONSTANTS.CATEGORY.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="amount">Quantia</label>
            <div className="flex justify-center items-center rounded border border-zinc-700 ring-0 focus-within:ring-2  focus-within:ring-blue-500 outline-none">
              <span className="">
                <DollarSign className="size-4 m-2" />
              </span>
              <input
                type="number"
                min={0}
                name="amount"
                id="amount"
                placeholder="Valor de entrada"
                className="w-full p-2 bg-transparent rounded outline-none"
              />
            </div>
          </div>
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
                      <ArrowUp className="size-4 peer-checked:text-gray-100" />
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
            <button className="mt-2 px-2 py-3 outline-none focus-within:ring-2 focus-within:ring-blue-500 ring-0 bg-green-700 rounded text-gray-100 w-full block">
              Cria nova transação
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
