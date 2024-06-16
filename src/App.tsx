import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Transation, TransationType } from "./type";
import { DialogCreatTask } from "./components/Dialog/createTransation";

function App() {
  const [transation, setTransation] = useState<Transation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearct] = useState('')
  const formatterNumber = new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
  });

  function onClose() {
    setIsModalOpen(false);
  }
  function onOpenModal() {
    setIsModalOpen(true);
  }

  function SaveInstorage(){
    localStorage.setItem('transation', JSON.stringify(transation))
  }

  function onCreateTransation(newTransations: Transation) {
    console.log(newTransations);
    setTransation((prev) => [...prev, newTransations]);
    onClose();
    SaveInstorage()
  }

  function convertAmountToCurrency(amount: number) {
    return formatterNumber.format(amount);
  }

  function onSearch(e: ChangeEvent<HTMLInputElement>){
    e.preventDefault()
    setSearct(e.target.value)
    
  }

  const filterData = transation.filter((item) => item.description.toLowerCase().includes(search.toLowerCase()) || item.date.toLocaleString().includes(search.toLowerCase()) || item.transationType.toLowerCase().includes(search.toLowerCase())) 

  function findTotal(type: string){
      return filterData.filter((item) => item.transationType.toLowerCase().includes(type.toLowerCase()))
      .reduce((total, item) => total + item.amount, 0 )
  }

  return (
    <main className=" w-full min-h-screen">
      <div className="flex flex-col">
        <section className=" bg-gray-900 h-40 w-full flex justify-between px-8 py-12">
          <span>Logo</span>
          <button
            onClick={onOpenModal}
            className="bg-green-700 font-semibold px-4 py-2 text-gray-100 rounded hover:bg-green-700/80"
            type="button"
          >
            Nova Transação
          </button>
        </section>

        <section className="w-full -mt-12 px-8 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex justify-between p-4 bg-zinc-800 rounded">
              <div className="flex flex-col gap-2">
                <span className="mb-1 text-base font-medium">Entradas</span>
                <span>
                  <h4 className="text-xl text-gray-100">{formatterNumber.format(findTotal(TransationType.inComing))}</h4>
                  <span className="text-sm text-zinc-400">
                    Última entrada 20/05/2024
                  </span>
                </span>
              </div>
              <ArrowUp className="text-green-700 size-6" />
            </div>
            <div className="flex justify-between p-4 bg-zinc-800 rounded">
              <div className="flex flex-col gap-2">
                <span className="mb-1 text-base font-medium">Saídas</span>
                <span>
                  <h4 className="text-xl text-gray-100">{formatterNumber.format(findTotal(TransationType.outComing))}</h4>
                  <span className="text-sm text-zinc-400">
                    Última Saída 20/05/2024
                  </span>
                </span>
              </div>
              <ArrowDown className="text-red-700 size-6" />
            </div>
            <div className="bg-green-700 flex justify-between p-4 rounded">
              <div className="flex flex-col gap-2">
                <span className="mb-1 text-base font-medium text-gray-100">
                  Total
                </span>
                <span>
                  <h4 className="text-xl text-gray-100">R$ 3.200,00</h4>
                  <span className="text-sm text-gray-100">
                    De 20/05/2024 até 20/10/2025
                  </span>
                </span>
              </div>
              <DollarSign className="text-zinc-100 size-6" />
            </div>
          </div>
        </section>
        <section className="px-8 py-4 flex flex-col gap-4 space-y-4">
          <h4 className="text-lg">Transações</h4>
          <div className="mt-2">
            <input
              type="search"
              name=""
              id="search"
              onChange={onSearch}
              className="w-full px-2 py-2 outline-none ring-0 rounded bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500"
              placeholder="Busque por uma transação"
            />
          </div>
          <article className="rounded">
            <table className="w-full table-auto min-w-full leading-normal rounded">
              <tbody className="w-full">
                {filterData.sort((a, b) =>b.date.getTime() - a.date.getTime()).map((item, index) => (
                  <tr
                    key={item.id}
                    className=" bg-gray-800 rounded mb-2 hover:bg-transparent/95 cursor-pointer"
                  >
                    <td className="py-3 px-4 text-left text-gray-300">
                      {item.description}
                    </td>
                    <td
                      className={`p-4 text-left  ${
                        item.transationType.toLowerCase().includes(TransationType.outComing.toLowerCase())
                          ? "text-red-700"
                          : "text-green-700"
                      } flex gap-2`}
                    >
                      <span>{convertAmountToCurrency(item.amount)}</span>
                    </td>
                    <td className="text-sm py-3 px-4 text-left text-gray-400 ">
                      {item.category}
                    </td>
                    <td className="text-sm py-3 px-4 text-left text-gray-400 ">
                      {item.transationType}
                    </td>
                    <td className="text-sm py-3 px-4 text-left text-gray-400 ">
                      {item.date.toString()}
                    </td>
                    <td className="text-sm py-3 px-4 text-left text-blue-500">
                      <ExternalLink />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </section>
      </div>
      {isModalOpen && (
        <DialogCreatTask
          isOpen={isModalOpen}
          onClose={onClose}
          onCreateTransation={onCreateTransation}
        />
      )}
    </main>
  );
}

export default App;
