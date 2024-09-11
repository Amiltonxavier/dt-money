import type { ComponentProps } from 'react'

type TableProps = ComponentProps<'table'>

export function Root({ ...props }: TableProps) {
  return <table {...props} className='border-separate border-spacing-y-4 w-full table-auto  leading-normal rounded' />
}
