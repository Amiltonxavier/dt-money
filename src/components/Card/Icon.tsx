import  { ComponentProps, ElementType } from 'react'
import { twMerge } from 'tailwind-merge'
type IconProps = ComponentProps<'div'> & {
    icon: ElementType
}
export  function Icon({icon: Icon, ...props}: IconProps) {
  return <Icon className={twMerge("size-4 sm:size-8", props.className) } />
}
