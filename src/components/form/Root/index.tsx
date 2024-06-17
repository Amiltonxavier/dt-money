import  { ComponentProps } from 'react'

type RootProps = ComponentProps<'div'> & {}

export function Root({ ...props }: RootProps) {
  return (
    <div className='flex flex-col gap-2' {...props} />
  )
}