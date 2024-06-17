import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
type ControlProps = ComponentProps<'input'> & {

}


export function Control({ type='text' ,...props }: ControlProps) {
  return (
    <input {...props} type={type} required className={twMerge(`w-full py-3 px-4 rounded bg-zinc-800 text-sm placeholder:text-zinc-400 outline-none ring-0`, props.className)} />
  )
}
