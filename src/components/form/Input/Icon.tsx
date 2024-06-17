import { ComponentProps, ElementType } from 'react'

type IconProps = ComponentProps<'span'> & {
    icon: ElementType
}

export function Icon({ icon: Icon, ...props }: IconProps) {
           //DollarSign
  return (
    <span {...props}>
        <Icon className="size-4 m-2" />
    </span>
  )
}
