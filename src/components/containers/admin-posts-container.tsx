import {useAuth} from "../../hooks/use-auth.ts";
import {useNavigate} from "react-router-dom";
import type {Post} from "../../types/post.ts";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {getPosts} from "../../services/api.ts";
import {LoaderSpinner} from "../loader-spinner.tsx";

export const AdminPostsContainer = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      toast.error('Access denied');
      navigate('/login');
      return;
    }

    const fetchPosts = async () => {
      try {
        const posts = await getPosts(); // Предполагаем, что метод существует
        setPosts(posts);
        setIsLoading(false);
      } catch (err: any) {
        toast.error(err.response?.data?.error || 'Failed to load posts');
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [isAdmin, navigate]);

  if (isLoading) {
    return <LoaderSpinner isVisible />;
  }

  return (
    <div className="shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
        {posts.map((post) => (
          <tr key={post.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{post.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{post.title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{post.category_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center gap-2">
              <button
                onClick={() => navigate(`/admin/posts/${post.id}/edit`)}
                className="primary-link"
              >
                Edit
              </button>
              <button
                className="primary-link text-rose-400"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};