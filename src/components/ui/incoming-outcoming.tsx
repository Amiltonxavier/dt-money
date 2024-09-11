
import { ArrowDown, ArrowUp } from 'lucide-react'
import { TransationType } from '../../type'

type IncomingOutComingBadgeProps = {
  transition: TransationType

}


export function IncomingOutComingBadge({ transition }: IncomingOutComingBadgeProps) {
  return (
    <>
      <span className='flex gap-2 items-center'>
        {transition}
        {transition.toLowerCase().includes(TransationType.outComing.toLowerCase())
          ? <ArrowDown className='size-4 text-red-700 ml-2' /> : <ArrowUp className='size-4 text-green-700' />}

      </span>
    </>
  )
}
