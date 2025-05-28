import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/use-auth.ts";
import { Icons } from "../icons.tsx";
import {UserButton} from "./user-button.tsx";

export const Header = () => {
  const {isAuthenticated} = useAuth();


  return (
    <header className="absolute h-15 z-40 bg-neutral-800 left-0 top-0 w-full">
      <div className="h-15 w-full flex items-center gap-4 px-4">
        <Link to="/"
              className="text-emerald-400 text-xl font-normal leading-none tracking-widest hover:text-emerald-300 px-4 flex items-center gap-1 group">
          <Icons.book className="size-6 animate-spinx" />
          BlogWebsite
        </Link>
        <div className="ml-auto">
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <UserButton />
              </>
            ) : (
              <>
                <Link to="/login" className="primary-button gap-2">
                  <Icons.login className="size-5" />
                  Sign In
                </Link>
                <Link to="/register" className="primary-button bg-emerald-800 gap-2">
                  <Icons.signup className="size-5" />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};