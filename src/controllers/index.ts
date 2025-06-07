import { Request, Response } from 'express';
import { BlogService } from '../services/blog.service';

export class IndexController {
  private blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  getIndex = (req: Request, res: Response) => {
    const recentPosts = this.blogService.getAllPosts().slice(0, 3);
    res.render('index', { recentPosts });
  };
}