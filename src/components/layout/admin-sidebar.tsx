import {Link} from "react-router-dom";

export const AdminSidebar = () => {
  const adminNav: {
    href: string;
    title: string;
  }[] = [
    {href: "/", title: "Blog" },
    {href: '/admin/dashboard', title: "Dashboard"},
    {href: '/admin/users', title: "Users"},
    {href: '/admin/posts', title: "Posts"},
    {href: '/admin/comments', title: "Comments"},
    {href: '/admin/categories', title: "Categories"},
  ]
  return (
    <aside className="w-1/5 shrink-0 border-t border-r border-neutral-700">
      <div className="flex flex-col">
        {adminNav.map((nav) => (
          <Link
            to={nav.href}
            key={nav.href}
            className="cursor-pointer h-10 flex transition-colors items-center justify-center font-medium py-1 px-4 text-sm bg-gray-700 hover:bg-gray-800">
            {nav.title}
          </Link>
        ))}
      </div>
    </aside>
  );
};