import { ComponentProps } from 'react'
import { TransationType } from '../../../type'

type RadioProps = ComponentProps<'input'> & {
    selectedType: TransationType
    handleChangeSelectedType: (type: TransationType) => void
}

export function Radio({selectedType, handleChangeSelectedType}: RadioProps) {

  return <input
    type="radio"
    className="peer sr-only"
    name="transationType"
    value={TransationType.outComing}
    checked={selectedType === TransationType.outComing}
    onChange={() =>
        handleChangeSelectedType(TransationType.outComing)
    }
/>
}
