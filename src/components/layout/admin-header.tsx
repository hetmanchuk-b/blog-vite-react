import {Link} from "react-router-dom";

export const AdminHeader = () => {

  const adminNav: {
    href: string;
    title: string;
  }[] = [
    {href: "/", title: "Blog" },
    {href: '/admin/dashboard', title: "Dashboard"},
    {href: '/admin/users', title: "Users"},
    {href: '/admin/posts', title: "Posts"},
    {href: '/admin/comments', title: "Comments"},
  ]

  return (
    <header className="absolute h-10 top-0 left-0 w-full">
      <div className="w-full flex gap-2">
        {adminNav.map((nav) => (
          <Link
            to={nav.href}
            key={nav.href}
            className="h-10 flex items-center justify-center font-medium py-1 px-4 rounded-sm text-sm bg-gray-700 hover:bg-gray-800">
            {nav.title}
          </Link>
        ))}

      </div>
    </header>
  );
};