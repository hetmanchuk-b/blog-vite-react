import {PostList} from "../components/post-list.tsx";
import {ClientLayout} from "../components/layout/client-layout.tsx";

export const HomePage = () => {
  return (
    <ClientLayout>
      <h1 className="text-2xl text-center font-bold mb-4">Blog posts</h1>

      <PostList />
    </ClientLayout>
  );
};