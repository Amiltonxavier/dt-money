import { Search as SearchIcon } from "lucide-react";
import * as Input from "../form/Input";
import type { ChangeEvent } from "react";

type SearchProps = {
    onSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

export function Search({ onSearch }: SearchProps) {
    return (
        <Input.Root>
            <Input.Wrapper>
                <Input.Icon icon={SearchIcon} />
                <Input.Control
                    type="search"
                    id="search"
                    onChange={onSearch}
                    className="w-full px-2.5 py-4 text-base outline-none ring-0 rounded"
                    placeholder="Busque por uma transação"
                />
            </Input.Wrapper>
        </Input.Root>
    )
}
