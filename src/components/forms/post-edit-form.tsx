import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../hooks/use-auth.ts";
import {useEffect, useState} from "react";
import type {Category} from "../../types/category.ts";
import {toast} from "sonner";
import {getCategories, getPost, updatePost} from "../../services/api.ts";
import {validatePostCategory, validatePostContent, validatePostTitle} from "../../validators/forms.ts";
import {LoaderSpinner} from "../loader-spinner.tsx";

interface FormData {
  title: string;
  content: string;
  category_id: number | '';
}

export const PostEditForm = () => {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const {isAdmin} = useAuth();
  const [formData, setFormData] = useState<FormData>({
    title: '', content: '', category_id: ''
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    category_id?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      toast.error('Access denied');
      navigate("/");
      return
    }

    const fetchData = async () => {
      if (!id) return;
      try {
        const [post, categories] = await Promise.all([
          getPost(Number(id)),
          getCategories()
        ]);
        setCategories(categories);
        setFormData({
          title: post.title,
          content: post.content,
          category_id: post.category_id,
        })
      } catch (err: any) {
        toast.error(err.response?.data?.error || 'Failed to load post or categories.');
        navigate('/admin/posts');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const titleError = validatePostTitle(formData.title);
    const contentError = validatePostContent(formData.content);
    const categoryError = validatePostCategory(formData.category_id);

    if (titleError || contentError || categoryError) {
      setErrors({
        title: titleError,
        content: contentError,
        category_id: categoryError,
      });
      toast.error('Please fix the errors in the form');
      return
    }

    if (!id) {
      toast.error('Invalid Post ID');
      return
    }

    try {
      await updatePost(Number(id), {
        title: formData.title,
        content: formData.content,
        category_id: formData.category_id as number,
      });
      toast.success('Post updated successfully!');
      setErrors({});
      navigate('/admin/posts');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to update post');
    }
  }

  if (isLoading) {
    return <LoaderSpinner isVisible />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => {
            setFormData({...formData, title: e.target.value});
            setErrors({...errors, title: validatePostTitle(e.target.value)});
          }}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          required
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => {
            setFormData({...formData, content: e.target.value});
            setErrors({...errors, content: validatePostContent(e.target.value)});
          }}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.content ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          rows={10}
          required
        />
        {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
      </div>
      <div>
        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category_id"
          value={formData.category_id}
          onChange={(e) => {
            const value = e.target.value ? Number(e.target.value) : '';
            setFormData({...formData, category_id: value});
            setErrors({...errors, category_id: validatePostCategory(value)});
          }}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.category_id ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && <p className="mt-1 text-sm text-red-500">{errors.category_id}</p>}
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => navigate('/admin/posts')}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};