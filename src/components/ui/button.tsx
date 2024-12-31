import type { ComponentProps } from 'react'

type Props = ComponentProps<'button'> & {

}

export function Button({ ...rest }: Props) {
    return (
        <button
            className="flex items-center gap-2 bg-green-700 font-semibold px-4 py-2 h-14 text-gray-100 rounded hover:bg-green-700/80 outline-none focus-within:ring-2 focus-within:ring-blue-700"
            {...rest}
        />
    )
}
