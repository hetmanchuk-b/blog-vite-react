import {PostList} from "../components/post-list.tsx";
import {ClientLayout} from "../components/layout/client-layout.tsx";
import {PageTitle} from "../components/layout/page-title.tsx";

export const HomePage = () => {
  return (
    <ClientLayout>
      <PageTitle
        title={'Blog posts'}
      />

      <PostList />
    </ClientLayout>
  );
};