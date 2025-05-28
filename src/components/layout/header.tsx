import {Link} from "react-router-dom";
import {useAuth} from "../../context/auth-context.tsx";
import {useState} from "react";
import {useDetectClickOutside} from "../../hooks/use-detect-click-outside.ts";

export const Header = () => {
  const [userNavOpen, setUserNavOpen] = useState(false);
  const {user, isAuthenticated, isAdmin, logout} = useAuth();

  const userNavRef = useDetectClickOutside({
    onTriggered: () => setUserNavOpen(false),
  })

  const toggleUserNav = () => {
    setUserNavOpen(!userNavOpen);
  }
  return (
    <header className="absolute h-15 z-40 bg-neutral-800 left-0 top-0 w-full">
      <div className="h-15 w-full flex items-center gap-4 px-4">
        <Link to="/"
              className="text-emerald-400 text-2xl font-bold leading-none hover:text-emerald-300 px-4">BlogWebsite</Link>
        <div className="ml-auto">
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <div className="relative" ref={userNavRef}>
                  <button
                    onClick={toggleUserNav}
                    className="flex items-center gap-2 cursor-pointer transition-colors hover:bg-neutral-700 h-9 px-3 rounded-lg">
                    <span className="font-semibold">{user?.username}</span>
                    <div className="size-9 rounded-full overflow-hidden bg-neutral-100 relative">
                      <div
                        className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-600 font-extrabold text-2xl leading-none select-none">
                        {user?.username.slice(0, 1).toUpperCase()}
                      </div>
                    </div>
                  </button>
                  {userNavOpen && (<div
                    className="absolute top-9 bg-neutral-800 p-4 w-51 right-0 rounded-lg min-h-47 max-h-[340px] overflow-auto blog-scrollbar">
                    <div className="space-y-2">
                      {isAdmin && (
                        <Link to="/create" className="primary-button bg-emerald-800 w-full">
                          Create post
                        </Link>
                      )}
                      <button
                        className="primary-button w-full"
                        onClick={logout}>
                        Logout
                      </button>
                    </div>
                  </div>)}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="primary-button">Sign In</Link>
                <Link to="/register" className="primary-button bg-emerald-800">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};