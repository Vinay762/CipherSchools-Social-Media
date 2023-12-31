import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    post : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Post',
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User',
    },
    text : {
        type : String,
        required : true
    }
}, {
    timestamps : true,
})

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;