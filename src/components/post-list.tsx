import {useEffect, useState} from "react";
import type {Post} from "../types/post.ts";
import type {Category} from "../types/category.ts";
import {getCategories, getPosts} from "../services/api.ts";
import {Link} from "react-router-dom";
import {Popover} from "./ui/popover.tsx";

interface Props {
  categoryId?: number;
}

export const PostList = ({categoryId}: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
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

  useEffect(() => {
    setSortedPosts(posts.sort((postA, postB) => {
      return new Date(postB.created_at).getTime() - new Date(postA.created_at).getTime();
    }));
  }, [posts]);

  return (
    <>
      <div className="mb-4">
        <div className="flex">
          <Popover className="w-full max-w-[190px]">
            <Popover.Button>Categories</Popover.Button>
            <Popover.List>
              <Popover.ListItem onClick={() => setSelectedCategory(undefined)}>
                All categories
              </Popover.ListItem>
              <Popover.Separator />
              {categories.map((category) => (
                <Popover.ListItem
                  onClick={() => setSelectedCategory(category.id)}
                  key={category.id}
                >
                  {category.name}
                </Popover.ListItem>
              ))}
            </Popover.List>
          </Popover>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => (
          <div key={post.id} className="border border-gray-600 py-2 px-4 rounded-lg flex flex-col items-start">
            <Link to={`/posts/${post.id}`}
                  className="text-xl font-semibold text-blue-400 hover:text-blue-100 block leading-none border-b border-blue-500 w-full pb-2 mb-2">
              {post.title}
            </Link>
            <p className="leading-tight mb-2">{post.content.slice(0, 100)}{post.content.length >= 100 && '...'}</p>
            <div className="flex justify-between w-full mt-auto">
              <p
                className="bg-blue-950 text-white text-xs border-blue-900 border rounded-full px-2.5 py-0.5">{post.category_name}</p>
              <p
                className="text-end self-end text-sm text-gray-400">{new Date(post.created_at).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-center text-gray-300">No posts in this category</p>
      )}
    </>
  );
};

