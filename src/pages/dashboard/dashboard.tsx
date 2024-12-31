import { type ChangeEvent, useEffect, useState } from "react";
import type { Transation, TransationDTO } from "../../type";
import { DialogCreateTransation } from "../../components/Dialog/createTransation";
import { DialogDetails } from "../../components/Dialog/details";
import { Search } from "../../components/Search";
import { Header } from "../../components/header/header";
import { TransationServices } from "../../services/transation";
import { Table } from "./dashboard-table";
import { CardInComing } from "./card-inComing";
import { CardOutComing } from "./card-outComing";
import { CardTotal } from "./card-total";
import { CardTotalTransation } from "./cart-total-transation";
import { useUser } from "../../context/user";
import { ChevronDown } from "lucide-react";
import { Widget } from "../../components/widget/widget";
export default function Dashboard() {
  const [transation, setTransation] = useState<TransationDTO[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearct] = useState("");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectItem, setSelectItem] = useState<string>("");
  const [openWidget, setWidget] = useState(false);
  const { user, signOut } = useUser();
  const transationService = new TransationServices();

  function onClose() {
    setIsModalOpen(false);
  }
  function onOpenModal() {
    setIsModalOpen(true);
  }

  function onOpenWidget() {
    setWidget(true);
  }

  function onCloseWidget() {
    setWidget(false);
  }

  async function onCreateTransation(newTransations: Transation) {
    const response = await transationService.create(newTransations);
    setTransation((transation) => [response, ...transation].slice(0, 10));
    onClose();
  }
  function onSearch(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearct(e.target.value);
  }
  const filterData = transation.filter((item) =>
    item.description.toLowerCase().includes(search.toLowerCase()),
  );
  function handleSelectItem(id: string) {
    setIsDetailsModalOpen(true);
    setSelectItem(id);
  }

  async function getDocuments() {
    const response = await transationService.list(user?.$id as string);
    setTransation(response.documents);
  }
  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex h-16 w-full border-b">
          <button
            type="button"
            onClick={onOpenWidget}
            className="flex items-center ml-auto p-4 border-l gap-2 cursor-pointer"
          >
            <div className="rounded-full size-10 flex items-center justify-center p-2 bg-yellow-900">
              <p>mt</p>
            </div>
            <div className="flex justify-between items-center gap-4">
              <div className="flex flex-col">
                <p className="text-left font-bold text-sm">{user?.name}</p>
                <span className="font-medium text-sm">{user?.email}</span>
              </div>

              <ChevronDown className="size-4" />
            </div>
          </button>
        </div>
        <Header onOpenModal={onOpenModal} />
        <section className="max-w-7xl w-full">
          <div className="w-full md:-mt-16 -mt-8">
            <div className="grid md:grid-cols-4 gap-4 px-4 md:px-2">
              <CardInComing transation={filterData} />
              <CardOutComing transation={filterData} />
              <CardTotalTransation transation={filterData} />
              <CardTotal transation={filterData} />
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto w-full px-4 sm:px-0">
          <div className="flex flex-col gap-4 space-y-4">
            <h4 className="text-lg">Transações</h4>
            <div className="mt-2">
              <Search onSearch={onSearch} />
            </div>
            {filterData.length === 0 ? (
              <p className="text-center text-gray-300">
                Nenhuma transação registrada
              </p>
            ) : (
              <Table
                handleSelectItem={handleSelectItem}
                transation={filterData}
              />
            )}
          </div>
        </section>
      </div>
      {isModalOpen && (
        <DialogCreateTransation
          onClose={onClose}
          onCreateTransation={onCreateTransation}
        />
      )}
      {isDetailsModalOpen && selectItem && (
        <DialogDetails
          data={filterData.find((item) => item.$id === selectItem)!}
          onClose={() => setIsDetailsModalOpen(false)}
          deleteTransition={transationService.delete}
        />
      )}
      {openWidget && <Widget onClose={onCloseWidget} singnOut={signOut} />}
    </>
  );
}
