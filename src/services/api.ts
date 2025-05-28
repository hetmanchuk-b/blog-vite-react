import axios from "axios";
import type {Category} from "../types/category.ts";
import type {Post} from "../types/post.ts";
import type {Comment} from "../types/comment.ts";
import type {AuthResponse, ForgotPasswordData, LoginData, RegisterData, ResetPasswordData} from "../types/auth.ts";
import type {User} from "../types/user.ts";

const API_URL = import.meta.env.API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

// Categories
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories');
  return response.data;
}

// Posts
export const getPosts = async (category_id?: number): Promise<Post[]> => {
  const url = category_id ? `/posts?category_id=${category_id}` : '/posts';
  const response = await api.get(url);
  return response.data;
}

export const getPost = async (id: number): Promise<Post> => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
}

export const createPost = async (post: Omit<Post, 'id' | 'created_at' | 'category_name'>): Promise<Post> => {
  const response = await api.post('/posts', post);
  return response.data;
}

// Comments
export const getComments = async (post_id: number): Promise<Comment[]> => {
  const response = await api.get(`/comments/${post_id}`);
  return response.data;
}

export const createComment = async (comment: Omit<Comment, 'id' | 'created_at'>): Promise<Comment> => {
  const response = await api.post('/comments', comment);
  return response.data;
}

// Auth
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
}

export const forgotPassword = async ({email}: ForgotPasswordData): Promise<{ message: string }> => {
  const response = await api.post('/auth/forgot-password', {email});
  return response.data;
}

export const resetPassword = async ({token, newPassword}: ResetPasswordData): Promise<{ message: string }> => {
  const response = await api.post('/auth/reset-password', {token, newPassword});
  return response.data;
}

// Users
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
}

export const updateUserRole = async (userId: number, role: 'admin' | 'user'): Promise<User> => {
  const response = await api.put(`/users/${userId}/role`, {role});
  return response.data;
}

export const verifyToken = async (): Promise<{user: User}> => {
  const response = await api.get('/auth/verify');
  return response.data;
}

