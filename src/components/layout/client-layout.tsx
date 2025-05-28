import {Header} from "./header.tsx";
import {Sidebar} from "./sidebar.tsx";

interface Props {
  children?: React.ReactNode;
}

export const ClientLayout = ({children}: Props) => {
  return (
    <div className="flex h-full overflow-hidden pt-15">
      <Header />
      <Sidebar />
      <main className="grow overflow-auto relative z-10 blog-scrollbar">
        <div className="container mx-auto p-4">
          {children}
        </div>
      </main>
    </div>
  );
};