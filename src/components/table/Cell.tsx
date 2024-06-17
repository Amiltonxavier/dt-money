import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
type CellProps = ComponentProps<'td'>
export function Cell({ ...props }: CellProps) {
  return (
    <td 
      {...props}  
      className={twMerge('text-sm py-4 px-4 text-left text-gray-400 w-16', props.className)
      
      }  
    />
  )
}
