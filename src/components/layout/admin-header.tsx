import { Icons } from "../icons";

interface Props {
  toggleSidebar: () => void;
}

export const AdminHeader = ({toggleSidebar}: Props) => {



  return (
    <header className="absolute h-10 top-0 left-0 w-full">
      <div className="w-full flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="cursor-pointer h-10 flex transition-colors items-center justify-center font-medium py-1 px-4 rounded-sm text-sm bg-emerald-700 hover:bg-gray-800">
          <Icons.menu className="size-6" />
        </button>

        <div className="tracking-widest">Admin Dashboard</div>

      </div>
    </header>
  );
};