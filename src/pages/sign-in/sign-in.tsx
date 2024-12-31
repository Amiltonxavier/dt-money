import { AuthService } from "../../services/auth"


export default function SignIn() {
    const authService = new AuthService()

    const handleAuth = () => {
        authService.loginWithGoogle()
    }

    return (
        <div>
            <button type='button' onClick={handleAuth}>Login with Google</button>
        </div>
    )
}
