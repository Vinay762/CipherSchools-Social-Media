import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//@desc   Register a new user
//@route  PORT /api/users
//@access Public

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Pass all the fields required for the Users");
    }
    
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User Already Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    if(user){
        generateToken(res, user._id);
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
        })
    }else{
        res.status(400);
        throw new Error("Invalid User Data");
    }

})


//@desc  Authenticate a User
//@route PORT /api/users/auth
//@access Public

const authUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("Pass all the required Fields");
    }

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email
        })
    }else{
        res.status(401);
        throw new Error("Invalid email or Password");
    }
})


export {registerUser, authUser};