import {AdminHeader} from "./admin-header.tsx";
import {AdminSidebar} from "./admin-sidebar.tsx";

interface Props {
  children?: React.ReactNode;
}

export const AdminLayout = ({children}: Props) => {
  return (
    <div className="h-full relative flex pt-10">
      <AdminHeader/>
      <AdminSidebar />
      <main className="p-4 grow border-t border-neutral-700">
        {children}
      </main>
    </div>
  );
};