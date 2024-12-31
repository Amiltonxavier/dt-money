import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth";
import { useUser } from "../context/user";

export default function Layout() {
  const navigate = useNavigate();
  const { handleSaveUser, user } = useUser();

  const authService = new AuthService();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getUser();
        handleSaveUser(userData);
      } catch (error) {
        handleSaveUser(null);
      }
    };

    checkUser();
  }, []);

  if (!user) return navigate("/sign-in");
  return (
    <div className="mx-auto min-h-screen h-screen w-full flex flex-col space-y-4">
      <div className="h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
