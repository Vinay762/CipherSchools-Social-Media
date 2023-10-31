import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';


//desc :-  get all post sorted 
//route :- /api/posts
//acess :- Private

const getAllPosts = asyncHandler(async(req, res) => {
    const posts = await Post.find({}).sort({ createdAt: -1 }); 

    if (posts && posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404);
      throw new Error('No posts found.');
    }
})

//desc :- create post
//route :- /api/posts
//access :- private

const createPost = asyncHandler(async(req, res) => {
    const _id = req.user._id;
    const {title, description, image, hashtags} = req.body;

    if(!_id){
        res.status(400);
        throw new Error("You are not authorized");
    }
    if(!title || !description || !image || !hashtags){
        res.status(400);
        throw new Error("Pass all the required field ")
    }

    const post = await Post.create({
        user : _id,
        title : title,
        description : description,
        image : image,
        hashtags : hashtags
    })

    if(post){
        res.status(201).json({
            _id : post._id,
            title : post.title,
            description : post.description,
            image : post.image,
            hashtags : post.hashtags,
        })
    }else{
        res.status(400);
        throw new Error("Invalid Post Data");
    }

})


//desc :- delete Post
//route :- /api/posts/:id
//access :- Private

//must only be deleted by someone who created it
const deletePost = asyncHandler(async(req, res) => {
    
    const _id = req.params.id;
    const post = await Post.findOne({_id});
    console.log(req.user + ">>>>>>>>>>>>>");
    const loggedinUser = req.user._id;
    
    if(!_id){
        res.status(400);
        throw new Error("Pass the id");
    }
    if(!post){
        res.status(400);
        throw new Error(`No such post found with id = ${_id} `)
    }
    const userwhoCreated = post.user;
    console.log(loggedinUser, userwhoCreated);
    //response message are given for my better understanding
    if(!loggedinUser.equals(userwhoCreated)){
        res.status(400);
        throw new Error("You are trying to delete someone else Resource");
    }

    const deletedPost = await Post.deleteOne({_id});
    if(deletedPost){
        res.status(200).json(`Successfully deleted the post ${_id}`);
    }else{
        res.status(404);
        throw new Error(`Cannot find the postid ${_id}`);
    }
})


//desc  :- search post from the userid
//route :- /api/posts/:userid
//access :- Private

const getPostsByUser= asyncHandler(async(req, res) => {
    console.log("This Called");
    console.log(req.params);
    const userid = req.params.id;
    console.log(userid);
    const posts = await Post.find({user : userid});
    if(posts && posts.length > 0){
        res.status(200).json(posts);
    }else{
        res.status(400);
        throw new Error(`No Posts found with given userid i.e ${userid}`);
    }
})


//desc :- Get Posts By HashTags
//route :- /api/posts/search/:hashtag
//access :- Private

const getPostsByHashtag = asyncHandler(async(req, res) => {
    console.log("This is Called");
    const hashtag = req.params.hashtag;

    const posts = await Post.find({ hashtags: { $in: [hashtag] } });

    if (posts && posts.length > 0) {
        res.status(200).json(posts);
    } else {
        res.status(404);
        throw new Error(`No posts found with this hashtag ${hashtag}`);
    }
})


export {getAllPosts, createPost, deletePost, getPostsByUser, getPostsByHashtag};
