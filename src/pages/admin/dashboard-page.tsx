import {AdminLayout} from "../../components/layout/admin-layout.tsx";
import {AdminDashboardContainer} from "../../components/containers/admin-dashboard-container.tsx";

export const DashboardPage = () => {


  return (
    <AdminLayout>
      <AdminDashboardContainer />
    </AdminLayout>
  );
};