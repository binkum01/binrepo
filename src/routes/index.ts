import { Router } from 'express';
import { IndexController } from '../controllers/index';
import { BlogController } from '../controllers/blog.controller';

const router = Router();
const indexController = new IndexController();
const blogController = new BlogController();

export function setRoutes(app: Router) {
  // Home page
  app.get('/', indexController.getIndex.bind(indexController));

  // Blog routes
  app.get('/blog', blogController.getAllPosts);
  app.get('/blog/new', blogController.showCreateForm);
  app.post('/blog', blogController.createPost);
  app.get('/blog/:id', blogController.getPost);
  app.get('/blog/:id/edit', blogController.showEditForm);
  app.post('/blog/:id', blogController.updatePost);
  app.post('/blog/:id/delete', blogController.deletePost);
}

export default router;