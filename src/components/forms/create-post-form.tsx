import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Category} from "../../types/category.ts";
import {createPost, getCategories} from "../../services/api.ts";
import {toast} from "sonner";
import {Popover} from "../ui/popover.tsx";
import {twMerge} from "tailwind-merge";

export const CreatePostForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    categoryId?: string;
  }>({});
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (err: any) {
        toast.error(err.response?.data?.error || 'Failed to fetch categories.');
      }
    }

    fetchCategories();
  }, []);

  const validateForm = () => {
    const newErrors: {
      title?: string;
      content?: string;
      categoryId?: string;
    } = {};
    if (!title) newErrors.title = 'Title is required';
    if (!content) newErrors.content = 'Content is required';
    if (!categoryId) newErrors.categoryId = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    try {
      await createPost({title, content, category_id: Number(categoryId)});
      toast.success('Post created successfully!');
      navigate('/');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to create post.');
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto w-full">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-400">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors((prev) => ({...prev, title: e.target.value ? undefined : 'Title is required'}));
          }}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-400">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setErrors((prev) => ({...prev, content: e.target.value ? undefined : 'Content is required'}));
          }}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.content ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          rows={5}
        />
        {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
      </div>
      <div>
        <Popover>
          <Popover.Button
            className={twMerge(errors.categoryId && 'border border-red-500')}
          >
            {selectedCategoryName ? selectedCategoryName : 'Select Category'}
          </Popover.Button>
          <Popover.List>
            <Popover.ListItem
              onClick={() => {
                setCategoryId('');
                setSelectedCategoryName('');
                setErrors((prev) => ({
                  ...prev,
                  categoryId: 'Category is required'
                }));
              }}
            >
              Clear Category
            </Popover.ListItem>
            <Popover.Separator />
            {categories.map((category) => (
              <Popover.ListItem
                key={category.id}
                onClick={() => {
                  setCategoryId(Number(category.id));
                  setSelectedCategoryName(category.name);
                  setErrors((prev) => ({
                    ...prev,
                    categoryId: undefined,
                  }));
                }}
              >
                {category.name}
              </Popover.ListItem>
            ))}
          </Popover.List>
        </Popover>
        {errors.categoryId && <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>}
      </div>
      <button
        type="submit"
        className="secondary-button"
      >
        Create Post
      </button>
    </form>
  );
};