import {CreatePostForm} from "../components/forms/create-post-form.tsx";
import {AdminLayout} from "../components/layout/admin-layout.tsx";
import {PageTitle} from "../components/layout/page-title.tsx";

export const CreatePostPage = () => {
  return (
    <AdminLayout>
      <PageTitle title={'Create Post'} />

      <CreatePostForm />
    </AdminLayout>
  );
};