import { HandCoins, Plus } from 'lucide-react'
import { Button } from '../ui/button'


type Props = {
    onOpenModal: () => void
}

export function Header({ onOpenModal }: Props) {
    return (
        <section className="bg-gray-121214 h-40 px-4 sm:px-8 w-full flex justify-between py-12">
            <span>
                <HandCoins className="size-12 text-green-700" />
            </span>
            <Button
                onClick={onOpenModal}
                type="button"
            >
                <Plus />
                Nova Transação
            </Button>
        </section>
    )
}
