import {
  ArrowRightLeft,
  CircleArrowDown,
  CircleArrowUp,
  DollarSign,
  ExternalLink,
  HandCoins,
} from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { type Transation, TransationType } from "./type";
import { DialogCreatTask } from "./components/Dialog/createTransation";
import * as Card from "./components/Card";

import * as Tables from "./components/table";
import { convertAmountToCurrency, convertDate } from "./utils";
import { DialogDetails } from "./components/Dialog/details";
import { TranstiontypeBadge } from "./components/ui/transtion-type";
import { Search } from "./components/Search";
import { IncomingOutComingBadge } from "./components/ui/incoming-outcoming";
import { Storage } from "./store";
function App() {
  const [transation, setTransation] = useState<Transation[]>(() => {
    const storedTransactions = Storage.get()
    return storedTransactions
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearct] = useState('')
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectItem, setSelectItem] = useState<number | string>('')

  function onClose() {
    setIsModalOpen(false);
  }
  function onOpenModal() {
    setIsModalOpen(true);
  }


  function onCreateTransation(newTransations: Transation) {
    setTransation((prev) => [...prev, newTransations]);
    Storage.save(newTransations)
    onClose();
  }
  function onSearch(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setSearct(e.target.value)
  }
  const filterData = transation.filter((item) => item.description.toLowerCase().includes(search.toLowerCase()) || item.date.toLocaleString().includes(search.toLowerCase()) || item.transationType.toLowerCase().includes(search.toLowerCase()))

  function findTotal(type?: string) {
    if (!type) {
      return convertAmountToCurrency(transation.reduce((total, item) => total + item.amount, 0))
    }
    const currentTotal = filterData.filter((item) => item.transationType.toLowerCase().includes(type.toLowerCase()))
      .reduce((total, item) => total + item.amount, 0)
    return convertAmountToCurrency(currentTotal)
  }

  function handleSelectItem(id: string | number) {
    setIsDetailsModalOpen(true)
    setSelectItem(id)
  }

  function total() {
    const inComing = filterData.filter((item) => item.transationType.toLowerCase().includes(TransationType.inComing.toLowerCase()))
      .reduce((total, item) => total + item.amount, 0)

      const outComing = filterData.filter((item) => item.transationType.toLowerCase().includes(TransationType.outComing.toLowerCase()))
      .reduce((total, item) => total + item.amount, 0)

      return convertAmountToCurrency(inComing - outComing)
  }

  return (
    <main className="mx-auto min-h-screen max-w-[1600px] w-full flex flex-col gap-4">
      <div className="max-h-full overflow-hidden ">
        <div className="flex flex-col gap-5 max-w-full">
          <section className="bg-gray-121214 h-40 px-8 w-full flex justify-between py-12">
            <span>
              <HandCoins className="size-12 text-green-700" />
            </span>
            <button
              onClick={onOpenModal}
              className="bg-green-700 font-semibold px-4 py-2 h-14 text-gray-100 rounded hover:bg-green-700/80 outline-none focus-within:ring-2 focus-within:ring-blue-700"
              type="button"
            >
              Nova Transação
            </button>
          </section>
          <section className="max-w-7xl mx-auto w-full">
            <div className="w-full -mt-16">
              <div className="grid sm:grid-cols-4 gap-4">
                <Card.Root>
                  <Card.Wrapper>
                    <Card.Content title="Entrada" amount={findTotal(TransationType.inComing)} signal="+" />
                  </Card.Wrapper>
                  <Card.Icon icon={CircleArrowUp} className="text-green-700" />
                </Card.Root>
                <Card.Root>
                  <Card.Wrapper>
                    <Card.Content title="Saída" amount={findTotal(TransationType.outComing)} signal="-" />
                  </Card.Wrapper>
                  <Card.Icon icon={CircleArrowDown} className="text-red-700" />
                </Card.Root>
                <Card.Root>
                  <Card.Wrapper>
                    <Card.Content title={"Total de Transações"} amount={findTotal()} className="text-gray-100" />
                  </Card.Wrapper>
                  <Card.Icon icon={ArrowRightLeft} className="text-zinc-100" />
                </Card.Root>
                <Card.Root className="bg-green-700">
                  <Card.Wrapper>
                    <Card.Content title={"Total de Transações"} amount={total()} className="text-gray-100" />
                  </Card.Wrapper>
                  <Card.Icon icon={DollarSign} className="text-zinc-100" />
                </Card.Root>
              </div>
            </div>
          </section>
          {
            transation.length === 0 ? <p className="text-center text-gray-300">Nenhuma transação registrada</p>
              :
              <section className="max-w-7xl mx-auto w-full px-4 sm:px-0">
                <div className="flex flex-col gap-4 space-y-4">
                  <h4 className="text-lg">Transações</h4>
                  <div className="mt-2">
                    <Search onSearch={onSearch} />
                  </div>
                  <article className="rounded">
                    <Tables.Root>
                      <Tables.Tbody>
                        {filterData.sort((a, b) => b.date.getTime() - a.date.getTime()).map((item) => (
                          <Tables.Row
                            key={item.id}
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
                                onClick={() => handleSelectItem(item.id)}>
                                <ExternalLink />
                              </button>
                            </Tables.Cell>
                          </Tables.Row>
                        ))}
                      </Tables.Tbody>
                    </Tables.Root>
                  </article>
                </div>
              </section>
          }
        </div>
        {isModalOpen && (
          <DialogCreatTask
            onClose={onClose}
            onCreateTransation={onCreateTransation}
          />
        )}
        {isDetailsModalOpen && selectItem && (
          <DialogDetails data={filterData.find((item) => item.id === selectItem)!}
            onClose={() => setIsDetailsModalOpen(false)}
          />
        )}
      </div>
    </main>
  );
}

export default App;
