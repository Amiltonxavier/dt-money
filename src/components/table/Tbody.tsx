import type { ComponentProps } from "react"

type TbodyProps = ComponentProps<'tbody'> & {

}

export function Tbody({ ...props }: TbodyProps) {
  return (
    <tbody className='' {...props} />
  )
}
