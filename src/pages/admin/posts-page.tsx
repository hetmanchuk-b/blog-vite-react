import {AdminLayout} from "../../components/layout/admin-layout.tsx";
import {PageTitle} from "../../components/layout/page-title.tsx";
import {AdminPostsContainer} from "../../components/containers/admin-posts-container.tsx";

export const PostsPage = () => {
  return (
    <AdminLayout>
      <PageTitle title={'Manage Posts'} />

      <AdminPostsContainer />
    </AdminLayout>
  );
};