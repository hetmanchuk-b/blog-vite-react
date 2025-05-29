import {AdminLayout} from "../../components/layout/admin-layout.tsx";
import {PageTitle} from "../../components/layout/page-title.tsx";
import {PostEditForm} from "../../components/forms/post-edit-form.tsx";

export const EditPostPage = () => {
  return (
    <AdminLayout>
      <PageTitle title={'Edit post'} />

      <PostEditForm />
    </AdminLayout>
  );
};