import { createContext, useContext, useState, type ReactNode } from "react";
import { AuthService } from "../services/auth";


type UserProviderProps = {
    children: ReactNode
}

type Props = {
    user: User | null,
    handleSaveUser: (user: User | null) => void;
    signOut: () => Promise<void>
}

const userContext = createContext({} as Props);

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const authService = new AuthService()
    function handleSaveUser(user: User | null) {
        setUser(user)
    }

    async function signOut() {
        await authService.logoutUser();
    }
    return (
        <userContext.Provider value={{ handleSaveUser, user, signOut }}>
            {children}
        </userContext.Provider>
    )
}

export const useUser = () => useContext(userContext);