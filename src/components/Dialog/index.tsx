import { ReactNode } from "react";

interface DialogProps {
    onClose: () => void;
    children: ReactNode
}

export function Dialog({ onClose, children }: DialogProps) {
  return (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex items-center justify-center min-h-screen px-4'>
                <div onClick={onClose} aria-hidden="true" className='fixed inset-0 bg-black opacity-50'>
                 </div>
                 <div className='relative bg-gray-202024 rounded-lg w-full max-w-md p-6'>
                    {
                        children
                    }
                 </div>
            </div>
        </div>
    )
    
  
}