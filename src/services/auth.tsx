import { appwrite } from "../lib/appwriter";


export class AuthService {
    async loginWithGoogle() {
        try {
            await appwrite.account.createOAuth2Session(
                appwrite.OAuthProvider.Google,
                "http://localhost:5173/",
                "http://localhost:5173/sign-in"
            );
        } catch (err) {
            console.log(err);
        }
    };

    async logoutUser() {
        try {
            await appwrite.account.deleteSession('current')
        } catch (err) {
            console.error(err);
        }
    };

    async getUser() {
        try {
            const response = await appwrite.account.get<User>();
            return response

        } catch (error) {
            console.log(error)
        }
    }
}