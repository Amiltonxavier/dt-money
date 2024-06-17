import { ComponentProps } from "react"
import { twMerge } from 'tailwind-merge'
type RootProps = ComponentProps<'div'> 


export function Root({...props}: RootProps) {
  return (
    <div {...props} className={twMerge("flex justify-between p-2 sm:p-4 bg-zinc-800 rounded", props.className)} />
  )
}
