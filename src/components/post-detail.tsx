import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import { getPost, getComments, createComment } from '../services/api';
import type {Post} from "../types/post.ts";
import type {Comment} from "../types/comment.ts";
import {useAuth} from "../hooks/use-auth.ts";
import {ClientLayout} from "./layout/client-layout.tsx";

export const PostDetail = () => {
  const {user, isAuthenticated, isAdmin} = useAuth();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState('');
  const [author, setAuthor] = useState(
    isAuthenticated ? user?.username : 'Guest'
  );
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const data = await getPost(Number(id));
        setPost(data);
        const commentsData = await getComments(Number(id));
        setComments(commentsData);
      }
    };
    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !commentContent || !author) {
      setError(true);
      setTimeout(() => setError(false), 10 * 1000)
      return
    }
    const newComment = await createComment({
      content: commentContent,
      post_id: Number(id),
      author,
    });
    setComments([...comments, newComment]);
    setCommentContent('');
  };

  if (!post) return <div>Loading...</div>;

  return (
    <ClientLayout>
      <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-2 mb-4">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        {isAdmin && (
          <>
            <Link className="primary-button" to={`/admin/posts/${post.id}/edit`}>
              Edit post
            </Link>
          </>
        )}
      </div>
      <div className="p-2 rounded-lg border border-gray-600 mb-4">
        <p className="text-gray-600 mb-2">Category: {post.category_name}</p>
        <p className="text-balance">{post.content}</p>
      </div>
      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      <div className="space-y-2 mb-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border p-2 rounded">
            <p className="font-semibold">{comment.author}</p>
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleCommentSubmit} className="space-y-2 max-w-2xl mx-auto w-full">
        <input
          type="text"
          value={author}
          readOnly
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Ваше имя"
          className="border p-2 w-full bg-transparent text-white cursor-default rounded bg-gray-400 font-semibold text-xl border-gray-600 outline-0"
        />
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Ваш комментарий"
          className="border p-2 w-full rounded bg-gray-400 font-semibold text-lg border-gray-600 text-gray-900 placeholder:text-gray-600"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600">
          Добавить комментарий
        </button>
        {error && (
          <p className="text-rose-300">Please fill up all fields</p>
        )}
      </form>
    </ClientLayout>
  );
};