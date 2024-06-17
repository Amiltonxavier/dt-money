import { ComponentProps } from 'react'

type SelectProps = ComponentProps<'select'>

export  function Trigger({ ...props}: SelectProps) {
  return <select {...props} required className="py-3 px-4 bg-zinc-800 rounded ring-0 focus-within:ring-2 focus-within:ring-blue-500 outline-none" />
}
