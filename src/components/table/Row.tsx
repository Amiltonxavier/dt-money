import { ComponentProps } from 'react'


type RowProps = ComponentProps<'tr'>
export function Row({...props}: RowProps) {
  return (
    <tr {...props}  className="bg-zinc-800 cursor-pointer rounded mt-2" />
  )
}
