import request from 'supertest';
import express from 'express';
import path from 'path';
import { BlogController } from '../src/controllers/blog.controller';

const app = express();

// Set up middleware
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'src', 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up routes
const blogController = new BlogController();
app.get('/blog', blogController.getAllPosts);
app.get('/blog/new', blogController.showCreateForm);
app.post('/blog', blogController.createPost);
app.get('/blog/:id', blogController.getPost);
app.get('/blog/:id/edit', blogController.showEditForm);
app.post('/blog/:id', blogController.updatePost);
app.post('/blog/:id/delete', blogController.deletePost);

describe('BlogController', () => {
  const testPost = {
    title: 'Test Post',
    content: 'This is a test post content',
    location: 'Test Location',
    author: 'Test Author',
    tags: 'test, blog'
  };

  describe('GET /blog', () => {
    it('should render blog index page', async () => {
      const response = await request(app)
        .get('/blog')
        .expect(200);

      expect(response.text).toContain('Travel Stories');
    });
  });

  describe('POST /blog', () => {
    it('should create a new blog post and redirect', async () => {
      const response = await request(app)
        .post('/blog')
        .send(testPost)
        .expect(302); // Redirect status code

      expect(response.header.location).toMatch(/^\/blog\/[\w-]+$/);
    });
  });

  describe('GET /blog/:id', () => {
    it('should render a single blog post', async () => {
      // First create a post
      const createResponse = await request(app)
        .post('/blog')
        .send(testPost);
      
      const postId = createResponse.header.location.split('/').pop();

      // Then get the post
      const response = await request(app)
        .get(`/blog/${postId}`)
        .expect(200);

      expect(response.text).toContain(testPost.title);
      expect(response.text).toContain(testPost.content);
    });

    it('should return 404 for non-existent post', async () => {
      await request(app)
        .get('/blog/non-existent-id')
        .expect(404);
    });
  });
});
