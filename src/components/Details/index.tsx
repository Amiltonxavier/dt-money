import React from 'react'
import { Dialog } from '../Dialog'

type DetailsProps = {
    isOpen: boolean,
    onClose: () => void,
}


export  function Details({isOpen, onClose}: DetailsProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} >
        <div className=''>
                <dl>
                    <dt>
                        Nome
                    </dt>
                    <dd>Descrição</dd>
                </dl>
        </div>
    </Dialog>
  )
}
