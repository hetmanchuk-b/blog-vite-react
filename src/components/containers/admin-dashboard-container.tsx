import {useAuth} from "../../hooks/use-auth.ts";
import {Link} from "react-router-dom";
import {Tabs} from "../ui/tabs.tsx";

export const AdminDashboardContainer = () => {
  const {user} = useAuth();


  return (
    <div>
      <div className="flex flex-col items-center lg:flex-row gap-2 lg:gap-4 justify-between mb-4">
        <h1 className="text-2xl text-center font-bold">Blog Dashboard</h1>
        <p className="text-gray-400 text-center">
          Welcome, <b className="font-bold">{user?.username}</b>
        </p>
      </div>
      <Tabs>
        <Tabs.List>
          <Tabs.Button tabIndex={0}>
            Windows
          </Tabs.Button>
          <Tabs.Button tabIndex={1}>
            Linux
          </Tabs.Button>
          <Tabs.Button tabIndex={2}>
            Samsung
          </Tabs.Button>
          <Tabs.Button tabIndex={3}>
            Nokia
          </Tabs.Button>
        </Tabs.List>
        <Tabs.Content tabIndex={0}>
          asd;flasdl ;f,asd; f,asd;fl,' as;fl,as ';fl,as' ;flas'fl,'a;sldf
        </Tabs.Content>
        <Tabs.Content tabIndex={1}>
          a111sd;fl11111asdl ;f,asd; f,asd;fl,' 1111as;fl,as ';fl,as' ;fla111s'fl,'a;sldf
        </Tabs.Content>
        <Tabs.Content tabIndex={2}>
          asd2222;fl2222asdl ;f,2222a2222sd; f,asd;2222fl,' 2222as;fl,as 22222222;fl,as' ;fla2222s'fl,2222'a;sldf
        </Tabs.Content>
        <Tabs.Content tabIndex={3}>
          asd;33333fla33333sdl ;33333f,asd; 33333f,a33333sd;f33333l,' as33333;fl33333,as ';fl33333,a33333s' ;f33333las33333'fl,33333'a;sl33333df
        </Tabs.Content>
      </Tabs>
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


      </div>
    </div>
  );
};