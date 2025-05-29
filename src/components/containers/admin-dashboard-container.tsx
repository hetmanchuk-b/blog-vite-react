import {useAuth} from "../../hooks/use-auth.ts";
import {Link} from "react-router-dom";
import {Modal} from "../ui/modal.tsx";
import {useModal} from "../../hooks/use-modal.tsx";

export const AdminDashboardContainer = () => {
  const {user} = useAuth();

  const modalProps = useModal();

  return (
    <div>
      <div className="flex flex-col items-center lg:flex-row gap-2 lg:gap-4 justify-between mb-4">
        <h1 className="text-2xl text-center font-bold">Blog Dashboard</h1>
        <p className="text-gray-400 text-center">
          Welcome, <b className="font-bold">{user?.username}</b>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
        <div className="border-2 border-gray-500 rounded-lg px-4 py-2 flex flex-col gap-2">
          <div className="flex justify-between items-start gap-2">
            <h2 className="text-xl font-bold">Posts</h2>
            <div className="flex flex-col items-end">
              <p className="text-gray-400 text-sm">
                Public posts: <b className="font-bold">10</b>
              </p>
              <p className="text-gray-400 text-sm">
                Total posts: <b className="font-bold">14</b>
              </p>
            </div>
          </div>
          <div className="mt-auto">
            <Link to="/admin/posts" className="secondary-button">Manage posts</Link>
          </div>
        </div>
        <div className="border-2 border-gray-500 rounded-lg px-4 py-2 flex flex-col gap-2">
          <div className="flex justify-between items-start gap-2">
            <h2 className="text-xl font-bold">Users</h2>
            <p className="text-gray-400 text-sm">
              Total users: <b className="font-bold">104</b>
            </p>
          </div>
          <div className="mt-auto">
            <Link to="/admin/users" className="secondary-button">Manage users</Link>
          </div>
        </div>
        <div className="border-2 border-gray-500 rounded-lg px-4 py-2 flex flex-col gap-2">
          <div className="flex justify-between items-start gap-2">
            <h2 className="text-xl font-bold">Categories</h2>
            <p className="text-gray-400 text-sm">
              Total categories: <b className="font-bold">8</b>
            </p>
          </div>
          <div className="mt-auto">
            <Link to="/admin/categories" className="secondary-button">Manage categories</Link>
          </div>
        </div>

        <button className="primary-button" onClick={() => modalProps.onOpen()}>Open</button>
        <Modal {...modalProps}>
          Hello
        </Modal>
      </div>
    </div>
  );
};