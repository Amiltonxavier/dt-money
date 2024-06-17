import { ComponentProps } from 'react'

type WrapperProps = ComponentProps <'div'> & {

}

export function Wrapper({...props}: WrapperProps) {
  return (
    <div {...props} className='flex flex-col gap-2 overflow-auto'  />
  )
}
