import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'


type RowProps = ComponentProps<'tr'>
export function Row({ className, ...props }: RowProps) {
  return (
    <tr
      className={twMerge("bg-zinc-800 cursor-pointer rounded", className)}
      {...props}
    />
  )
}
