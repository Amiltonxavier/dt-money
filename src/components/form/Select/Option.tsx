import { ComponentProps } from "react"



type OptionProps = ComponentProps<'option'>

export  function Option({ ...props}: OptionProps) {
  return (
    <option {...props} />
  )
}
