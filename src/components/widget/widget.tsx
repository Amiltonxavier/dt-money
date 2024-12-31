import { LogOut, UserCircle } from "lucide-react";
import { createPortal } from 'react-dom'
import { useNavigate } from "react-router-dom";



interface WidgetProps {
    onClose: () => void;
    singnOut: () => Promise<void>
}

export function Widget({ onClose, singnOut }: WidgetProps) {
    const router = useNavigate()
    //const [isExitPromptVisible, setIsExitPromptVisible] = useState(false);

    async function handleSignOut() {
        await singnOut()
        router('sign-in');
    }

    return createPortal(
        <div className='fixed max-w-5xl top-[70px] right-0 z-[1000]'>
            <div className='px-4'>
                <div
                    aria-hidden="true"
                    className='fixed inset-0'
                    onClick={onClose}
                >

                </div>
                <div className="border border-zinc-300 rounded-lg bg-white shadow-lg relative w-[202px] overflow-hidden">
                    <ul className="text-base z-[1000]">
                        <li>
                            <button
                                type="button"
                                className=" flex items-center justify-between gap-2 font-bold hover:bg-black/5 w-full">
                                <span className="text-sm">Perfil </span>
                                <UserCircle />
                            </button>
                        </li>

                        <li>
                            <button
                                type="button"
                                className="bg-rose-100 text-rose-500 p-4 hover:bg-rose-100/60 flex items-center justify-between gap-2 font-bold w-full"
                                onClick={handleSignOut}
                            >
                                <span className="font-bold text-sm">Sair</span>
                                <LogOut />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>,
        document.body
    );
}