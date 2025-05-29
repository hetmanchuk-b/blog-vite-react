import {Icons} from "../icons.tsx";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/use-auth.ts";
import {useDetectClickOutside} from "../../hooks/use-detect-click-outside.ts";
import {useState} from "react";

export const UserButton = () => {
  const [userNavOpen, setUserNavOpen] = useState(false);
  const {user, isAdmin, logout} = useAuth();

  const userNavRef = useDetectClickOutside({
    onTriggered: () => setUserNavOpen(false),
  })

  const toggleUserNav = () => {
    setUserNavOpen(!userNavOpen);
  }

  return (
    <div className="relative" ref={userNavRef}>
      <button
        onClick={toggleUserNav}
        className="flex items-center gap-2 cursor-pointer transition-colors hover:bg-neutral-700 h-9 px-3 rounded-lg">
        <span className="font-semibold">{user?.username}</span>
        <div className="size-7 rounded-full overflow-hidden bg-neutral-400 relative">
          <div
            className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-600 font-extrabold leading-none select-none">
            <Icons.menu className="size-5"/>
          </div>
        </div>
      </button>
      {userNavOpen && (<div
        className="absolute top-9 bg-neutral-800 p-4 w-58 right-0 rounded-lg min-h-10 max-h-[340px] overflow-auto blog-scrollbar">
        <div className="space-y-2">
          {isAdmin && (
            <>
              <Link to="/admin/posts/create"
                    className="primary-button min-h-7 bg-neutral-600 hover:bg-neutral-700 w-full flex items-center gap-2">
                Create post
                <Icons.pen className="size-4"/>
              </Link>
              <Link to="/admin/dashboard"
                    className="primary-button min-h-7 bg-neutral-600 hover:bg-neutral-700 w-full flex items-center gap-2">
                Admin
                <Icons.lock className="size-4"/>
              </Link>
              <div className="h-0.5 w-full my-3 bg-indigo-300"></div>
            </>
          )}
          <Link to="/settings"
                className="primary-button min-h-7 bg-neutral-600 hover:bg-neutral-700 w-full flex items-center gap-2">
            Profile settings
            <Icons.userSettings className="size-4"/>
          </Link>
          <button
            className="primary-button w-full h-13 gap-2"
            onClick={logout}>
            Logout
            <Icons.logout className="size-5"/>
          </button>
        </div>
      </div>)}
    </div>
  );
};