import { Request, Response } from 'express';
import { BlogService } from '../services/blog.service';
import { CreateBlogPostDto } from '../types/blog';

export class BlogController {
  private blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  getAllPosts = (req: Request, res: Response) => {
    const posts = this.blogService.getAllPosts();
    res.render('blog/index', { posts });
  };

  getPost = (req: Request, res: Response) => {
    const post = this.blogService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).render('error', { message: 'Post not found' });
    }
    res.render('blog/post', { post });
  };

  showCreateForm = (req: Request, res: Response) => {
    res.render('blog/create');
  };

  createPost = (req: Request, res: Response) => {
    const postData: CreateBlogPostDto = {
      title: req.body.title,
      content: req.body.content,
      location: req.body.location,
      author: req.body.author,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(',').map((tag: string) => tag.trim())
    };

    const newPost = this.blogService.createPost(postData);
    res.redirect(`/blog/${newPost.id}`);
  };

  showEditForm = (req: Request, res: Response) => {
    const post = this.blogService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).render('error', { message: 'Post not found' });
    }
    res.render('blog/edit', { post });
  };

  updatePost = (req: Request, res: Response) => {
    const postData: Partial<CreateBlogPostDto> = {
      title: req.body.title,
      content: req.body.content,
      location: req.body.location,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(',').map((tag: string) => tag.trim())
    };

    const updatedPost = this.blogService.updatePost(req.params.id, postData);
    if (!updatedPost) {
      return res.status(404).render('error', { message: 'Post not found' });
    }
    res.redirect(`/blog/${updatedPost.id}`);
  };

  deletePost = (req: Request, res: Response) => {
    const deleted = this.blogService.deletePost(req.params.id);
    if (!deleted) {
      return res.status(404).render('error', { message: 'Post not found' });
    }
    res.redirect('/blog');
  };
}
