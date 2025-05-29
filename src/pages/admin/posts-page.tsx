import {AdminLayout} from "../../components/layout/admin-layout.tsx";
import {PageTitle} from "../../components/layout/page-title.tsx";
import {AdminPostsContainer} from "../../components/containers/admin-posts-container.tsx";
import {Link} from "react-router-dom";

export const PostsPage = () => {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between gap-2 lg:gap-4 flex-col lg:flex-row mb-3 lg:mb-4">
        <PageTitle title={'Manage Posts'} className="mb-0 lg:mb-0" />

        <Link to='/admin/posts/create' className="primary-link text-xl">New post</Link>
      </div>

      <AdminPostsContainer />
    </AdminLayout>
  );
};