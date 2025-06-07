import { BlogService } from '../src/services/blog.service';
import { BlogPost, CreateBlogPostDto } from '../src/types/blog';

describe('BlogService', () => {
  let blogService: BlogService;
  let testPost: CreateBlogPostDto;

  beforeEach(() => {
    blogService = new BlogService();
    testPost = {
      title: 'Test Post',
      content: 'This is a test post content',
      location: 'Test Location',
      author: 'Test Author',
      tags: ['test', 'blog']
    };
  });

  describe('createPost', () => {
    it('should create a new blog post', () => {
      const post = blogService.createPost(testPost);

      expect(post.id).toBeDefined();
      expect(post.title).toBe(testPost.title);
      expect(post.content).toBe(testPost.content);
      expect(post.location).toBe(testPost.location);
      expect(post.author).toBe(testPost.author);
      expect(post.tags).toEqual(testPost.tags);
      expect(post.date).toBeInstanceOf(Date);
    });
  });

  describe('getAllPosts', () => {
    it('should return all posts', () => {
      const post1 = blogService.createPost(testPost);
      const post2 = blogService.createPost({
        ...testPost,
        title: 'Second Post'
      });

      const posts = blogService.getAllPosts();

      expect(posts).toHaveLength(2);
      expect(posts).toContainEqual(post1);
      expect(posts).toContainEqual(post2);
    });

    it('should return empty array when no posts exist', () => {
      const posts = blogService.getAllPosts();
      expect(posts).toHaveLength(0);
    });
  });

  describe('getPostById', () => {
    it('should return post by id', () => {
      const createdPost = blogService.createPost(testPost);
      const foundPost = blogService.getPostById(createdPost.id);

      expect(foundPost).toEqual(createdPost);
    });

    it('should return undefined for non-existent post', () => {
      const post = blogService.getPostById('non-existent-id');
      expect(post).toBeUndefined();
    });
  });

  describe('updatePost', () => {
    it('should update existing post', () => {
      const post = blogService.createPost(testPost);
      const updateData = {
        title: 'Updated Title',
        content: 'Updated content'
      };

      const updatedPost = blogService.updatePost(post.id, updateData);

      expect(updatedPost?.title).toBe(updateData.title);
      expect(updatedPost?.content).toBe(updateData.content);
      expect(updatedPost?.location).toBe(post.location);
    });

    it('should return undefined for non-existent post', () => {
      const result = blogService.updatePost('non-existent-id', { title: 'New Title' });
      expect(result).toBeUndefined();
    });
  });

  describe('deletePost', () => {
    it('should delete existing post', () => {
      const post = blogService.createPost(testPost);
      const result = blogService.deletePost(post.id);

      expect(result).toBe(true);
      expect(blogService.getPostById(post.id)).toBeUndefined();
    });

    it('should return false for non-existent post', () => {
      const result = blogService.deletePost('non-existent-id');
      expect(result).toBe(false);
    });
  });
});
