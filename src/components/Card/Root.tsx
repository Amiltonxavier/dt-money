import { ComponentProps } from "react"
import { twMerge } from 'tailwind-merge'
type RootProps = ComponentProps<'div'> 


export function Root({...props}: RootProps) {
  return (
    <div {...props} className={twMerge("flex justify-between px-4 py-3 sm:py-8 bg-zinc-800 rounded", props.className)} />
  )
}
