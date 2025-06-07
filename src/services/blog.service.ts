import { BlogPost, CreateBlogPostDto } from '../types/blog';
import { v4 as uuidv4 } from 'uuid';

export class BlogService {
  private posts: BlogPost[] = [];

  getAllPosts(): BlogPost[] {
    return this.posts;
  }

  getPostById(id: string): BlogPost | undefined {
    return this.posts.find(post => post.id === id);
  }

  createPost(postData: CreateBlogPostDto): BlogPost {
    const newPost: BlogPost = {
      id: uuidv4(),
      date: new Date(),
      ...postData
    };
    this.posts.push(newPost);
    return newPost;
  }

  updatePost(id: string, postData: Partial<CreateBlogPostDto>): BlogPost | undefined {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) return undefined;

    this.posts[index] = {
      ...this.posts[index],
      ...postData
    };
    return this.posts[index];
  }

  deletePost(id: string): boolean {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) return false;

    this.posts.splice(index, 1);
    return true;
  }
}
