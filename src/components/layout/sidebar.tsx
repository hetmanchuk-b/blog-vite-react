import {Link} from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="w-[15%] bg-neutral-800 p-2 relative z-20 shrink-0">
      <div className="flex flex-col gap-1 items-center">
        <Link to='/' className="primary-button w-full">Home</Link>
        <Link to='/create' className="primary-button w-full">Create post</Link>
      </div>
    </aside>
  );
};