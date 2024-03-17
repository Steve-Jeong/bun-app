const postController = require("../controllers/postController.js");
const express = require("express");
const router = express.Router();
const protect = require('../middleware/authMiddleware.js')
router
  .route("/")
  .get(postController.getAllPosts)
  .post(protect, postController.createPost);
router
  .route("/:id")
  .get(postController.getPost)
  .patch(protect, postController.updatePost)
  .delete(protect, postController.deletePost);

module.exports = router;
