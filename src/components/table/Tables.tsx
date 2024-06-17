import { ComponentProps } from 'react'

type TableProps = ComponentProps<'table'>

export function Root({...props}: TableProps) {
  return <table {...props} className='w-full table-auto min-w-full leading-normal rounded' />
  
}
