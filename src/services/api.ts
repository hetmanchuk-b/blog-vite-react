import axios from "axios";
import type {Category} from "../types/category.ts";
import type {Post} from "../types/post.ts";
import type {Comment} from "../types/comment.ts";

const API_URL = import.meta.env.API_URL || 'http://localhost:3000';

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
}

export const getPosts = async (category_id?: number): Promise<Post[]> => {
  const url = category_id ? `${API_URL}/posts?category_id=${category_id}` : `${API_URL}/posts`;
  const response = await axios.get(url);
  return response.data;
}

export const getPost = async (id: number): Promise<Post> => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return response.data;
}

export const createPost = async (post: Omit<Post, 'id' | 'created_at' | 'category_name'>): Promise<Post> => {
  const response = await axios.post(`${API_URL}/posts`, post);
  return response.data;
}

export const getComments = async (post_id: number): Promise<Comment[]> => {
  const response = await axios.get(`${API_URL}/comments/${post_id}`);
  return response.data;
}

export const createComment = async (comment: Omit<Comment, 'id' | 'created_at'>): Promise<Comment> => {
  const response = await axios.post(`${API_URL}/comments`, comment);
  return response.data;
}