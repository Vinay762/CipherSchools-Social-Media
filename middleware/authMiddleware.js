import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';


const protect =  asyncHandler(async(req, res, next) => {
    //console.log("protect first Called")
    let token;
    token = req.cookies.jwt;
    //console.log(token);
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
           
            next();
        }catch (error){
            console.log(error);
            res.status(401);
            throw new Error("Not Authorized, Token Failed");
        }
    }else{
        res.status(401);
        throw new Error("Not Authorized, no token");
    }
})


export {protect};