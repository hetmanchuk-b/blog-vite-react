export interface Post {
  id: number;
  title: string;
  content: string;
  category_id: number;
  created_at: string;
  category_name?: string;
}