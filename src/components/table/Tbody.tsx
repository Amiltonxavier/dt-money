import { ComponentProps } from "react"

type TbodyProps = ComponentProps<'tbody'> & {
    
}

export function Tbody({ ...props }: TbodyProps) {
  return (
    <tbody className='w-full' {...props} />
  )
}
