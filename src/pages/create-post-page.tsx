import {CreatePostForm} from "../components/forms/create-post-form.tsx";
import {AdminLayout} from "../components/layout/admin-layout.tsx";

export const CreatePostPage = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Create Post</h1>

      <CreatePostForm />
    </AdminLayout>
  );
};