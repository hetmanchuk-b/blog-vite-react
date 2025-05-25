import { useState, useEffect } from 'react';
import { createPost, getCategories } from '../services/api';
import { useNavigate } from 'react-router-dom';
import type {Category} from "../types/category.ts";

const PostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      if (data.length > 0) setCategoryId(data[0].id);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !categoryId) return;
    await createPost({ title, content, category_id: categoryId });
    navigate('/');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Создать пост</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок"
          className="border p-2 w-full rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Содержимое"
          className="border p-2 w-full h-32 rounded"
        />
        <select
          value={categoryId || ''}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="bg-gray-950 border p-2 w-full rounded"
        >
          {categories.map((category) => (
            <option
              className="text-gray-100"
              key={category.id}
              value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600">
          Создать
        </button>
      </form>
    </div>
  );
};

export default PostForm;