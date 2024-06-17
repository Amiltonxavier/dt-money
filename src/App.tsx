import {
  ArrowDown,
  ArrowUp,
  CircleArrowDown,
  CircleArrowUp,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Transation, TransationType } from "./type";
import { DialogCreatTask } from "./components/Dialog/createTransation";
import * as Card from "./components/Card";
import * as Input from "./components/form/Input";
import * as Tables from "./components/table";
import { convertAmountToCurrency, convertDate } from "./utils";
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



  function onSearch(e: ChangeEvent<HTMLInputElement>){
    e.preventDefault()
    setSearct(e.target.value) 
  }
  const filterData = transation.filter((item) => item.description.toLowerCase().includes(search.toLowerCase()) || item.date.toLocaleString().includes(search.toLowerCase()) || item.transationType.toLowerCase().includes(search.toLowerCase())) 

  function findTotal(type?: string) {
      if(!type){
        return convertAmountToCurrency(transation.reduce((total, item) => total + item.amount, 0))
      }
       const currentTotal = filterData.filter((item) => item.transationType.toLowerCase().includes(type.toLowerCase()))
      .reduce((total, item) => total + item.amount, 0 )
      return convertAmountToCurrency(currentTotal)
  }

{
  /* max-width: 1120px; */
  /* margin: 0 auto; */
  /* padding: 2.5rem 1rem; */
}
  return (
    <main className="w-full mx-auto min-h-screen">
      <div className="flex flex-col">
        <section className=" bg-gray-121214 h-40 w-full flex justify-between px-8 py-12">
          <span>Logo</span>
          <button
            onClick={onOpenModal}
            className="bg-green-700 font-semibold px-4 py-2 h-14 text-gray-100 rounded hover:bg-green-700/80 outline-none focus-within:ring-2 focus-within:ring-blue-700"
            type="button"
          >
            Nova Transação
          </button>
        </section>


        <section className="w-full -mt-12 px-8 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <Card.Root className="bg-green-700">
              <Card.Wrapper>
                <Card.Content title={"Total"} amount={findTotal()} className="text-gray-100"  />
              </Card.Wrapper>
              <Card.Icon icon={DollarSign} className="text-zinc-100" />
            </Card.Root>
          </div>
        </section>
        {
          transation.length === 0 ? <p className="text-center text-gray-300">Nenhuma transação registrada</p>
          :
        <section className="px-8 py-4 flex flex-col gap-4 space-y-4">
          <h4 className="text-lg">Transações</h4>
          <div className="mt-2">
          <Input.Root>
              <Input.Control
               type="search"
               id="search"
               onChange={onSearch}
               className="w-full px-2 py-4 text-base outline-none ring-0 rounded  focus-within:ring-2 focus-within:ring-blue-500"
               placeholder="Busque por uma transação"
              />
          </Input.Root>
          </div>
          <article className="rounded">
            <Tables.Root>
              <Tables.Tbody>
                {filterData.sort((a, b) =>b.date.getTime() - a.date.getTime()).map((item) => (
                  <Tables.Row
                    key={item.id}
                  >
                    <Tables.Cell className="font-semibold rounded-tl-md round-bl-md">
                      {item.description}
                    </Tables.Cell>
                    <Tables.Cell
                      className={`${
                        item.transationType.toLowerCase().includes(TransationType.outComing.toLowerCase())
                          ? "text-red-700"
                          : "text-green-700"
                      }`}
                    >
                      <span>{item.transationType.toLowerCase().includes(TransationType.outComing.toLowerCase()) ? "-" : "+"} { convertAmountToCurrency(item.amount)}</span>
                    </Tables.Cell>
                    <Tables.Cell>
                      {item.category}
                    </Tables.Cell>
                    <Tables.Cell>
                      {item.transationType}
                    </Tables.Cell>
                    <Tables.Cell>
                      {convertDate(item.date)}
                    </Tables.Cell>
                    <Tables.Cell className="rounded-tr-md round-br-md">
                      <ExternalLink />
                    </Tables.Cell>
                  </Tables.Row>
                ))}
              </Tables.Tbody>
            </Tables.Root>
          </article>
        </section>
        }
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
