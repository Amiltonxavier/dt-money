
import { TransationType } from '../../type'
import { convertAmountToCurrency } from '../../utils'

type TransitionTypeProps = {
    transition: TransationType
    amount: number
}


export function TranstiontypeBadge({transition, amount}: TransitionTypeProps) {
  return (
    <>
        {
            transition.toLowerCase().includes(TransationType.outComing.toLowerCase()) 
            ?
           <span className='text-red-700'> - {convertAmountToCurrency(amount)}</span> :
           <span className='text-green-700'> + {convertAmountToCurrency(amount)}</span> 
        
        }
    </>
  )
}
