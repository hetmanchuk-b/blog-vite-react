import {AdminHeader} from "./admin-header.tsx";
import {AdminSidebar} from "./admin-sidebar.tsx";
import {useState} from "react";

interface Props {
  children?: React.ReactNode;
}

export const AdminLayout = ({children}: Props) => {
  const [isSidebarShown, setIsSidebarShown] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarShown(!isSidebarShown);
  }

  return (
    <div className="h-full relative flex pt-10">
      <AdminHeader toggleSidebar={toggleSidebar}/>
      {isSidebarShown && <AdminSidebar />}
      <main className="p-4 grow border-t border-neutral-700">
        {children}
      </main>
    </div>
  );
};