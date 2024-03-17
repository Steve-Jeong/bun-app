const Post = require('../models/postModel.js')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const chalk = require('chalk')

exports.getAllPosts = async(req, res) => {
  try {
    const posts = await Post.find()
    console.log(chalk.inverse.green("posts : ", posts));
    if(posts) {
      res.status(200).json({
        status: 'success',
        count: posts.length,
        data: {
          posts
        }
      })
    } else {
      res.status(400).json({
        status: 'failed',
        message: 'post not found'
      })
    }
  } catch (e) {
    console.log('getAllPosts Error : ', e)
    res.status(400).json({
      status: 'failed'
    })
  }
}
exports.getPost = async(req, res) => {
  try {
    console.log(chalk.inverse.blue("get a post : "));
    const post = await Post.findById(new ObjectId(req.params.id));
    console.log(chalk.inverse.blue('content of a post : ', post))
    if (post) {
      res.status(200).json({
        status: "success",
        data: {
          post,
        },
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "post not found",
      });
    }
    // res.status(200).json({
    //   status: "success",
    //   data: {
    //     post,
    //   },
    // });
  } catch (e) {
    console.log("getPost Error : ", e);
    res.status(400).json({
      status: "failed",
      message: "post id format was wrong"
    });
  }
}
exports.createPost = async(req, res) => {
  try {
    const post = await Post.create(req.body)
    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    })
  } catch (e) {
    console.log("createPost Error : ", e);
    res.status(400).json({
      status: "failed",
    });
  }
}
exports.updatePost = async(req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      new ObjectId(req.params.id),
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    })
  } catch (e) {
    res.status(400).json({
      status: 'failed'
    })
  }
}

exports.deletePost = async (req, res) => {
	try {
		const post = await Post.findByIdAndDelete(new ObjectId(req.params.id));
		console.log('delete a post : ', post)
		res.status(200).json({
			status: 'success',
		})
	} catch (error) {
		// console.log('delete post error : ', error)
		res.status(400).json({
		status: 'fail',
			message: 'delete post failed'
		})
	}
}
