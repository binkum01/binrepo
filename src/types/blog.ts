export interface BlogPost {
  id: string;
  title: string;
  content: string;
  location: string;
  date: Date;
  author: string;
  imageUrl?: string;
  tags: string[];
}

export interface CreateBlogPostDto {
  title: string;
  content: string;
  location: string;
  author: string;
  imageUrl?: string;
  tags: string[];
}
