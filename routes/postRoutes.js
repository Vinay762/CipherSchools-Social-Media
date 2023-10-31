import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getAllPosts, createPost, deletePost, getPostsByUser,getPostsByHashtag } from '../controllers/postController.js';
const router = express.Router();

router.get('/',protect, getAllPosts);
router.post('/',protect, createPost);
router.delete('/:id', protect, deletePost);
router.get('/:id', protect, getPostsByUser);
router.get('/search/:hashtag', protect, getPostsByHashtag);
export default router;