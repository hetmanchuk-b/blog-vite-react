import {useEffect, useState} from "react";
import type {Post} from "../types/post.ts";
import type {Category} from "../types/category.ts";
import {getCategories, getPosts} from "../services/api.ts";
import {Link} from "react-router-dom";

interface Props {
  categoryId?: number;
}

export const PostList = ({categoryId}: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(categoryId);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getPosts(selectedCategory);
      setPosts(postsData);
    }
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    }
    fetchPosts();
    fetchCategories();
  }, [selectedCategory]);

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold mb-4">Blog posts</h1>
      <div className="mb-4">
        <div className="flex">
          <label
            htmlFor="category-select"
            className="mr-2">Category filter:</label>
          <select
            id="category-select"
            className="bg-gray-950"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : undefined)}>
            <option value="">All posts</option>
            {categories.map(category => (
              <option
                className="text-gray-100"
                key={category.id}
                value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="border border-gray-600 p-4 rounded-lg flex flex-col items-start">
            <Link to={`/posts/${post.id}`} className="text-xl font-semibold text-blue-600 hover:text-blue-500 block leading-none border-b border-blue-500 w-full pb-2">
              {post.title}
            </Link>
            <p className="text-gray-600 mb-2">{post.category_name}</p>
            <p className="leading-tight mb-2">{post.content.slice(0, 100)}...</p>
            <p className="text-end self-end text-sm text-gray-400 mt-auto">{new Date(post.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-center text-gray-600">No posts found</p>
      )}
    </div>
  );
};

export default PostList;