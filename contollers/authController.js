const User=require('../models/user');
const {BadRequest,CustomAPIError,unAuthenticatedError}=require('../errors');
const statusCode=require('http-status-codes');
const {attachCookieToResponse}=require('../utils/jwt')


///-------------------------- REGISTER USER ------------------------------------
exports.register=async (req,res)=>{
    let {name,email,password,role}=req.body;
    //checking for existing user
    const exUser= await User.findOne({email});
    if(exUser){
        //if user already exist throw error with message
        throw new BadRequest('User Already exists with this email');
    }
    const isFirstAccount= (await User.countDocuments({})===0);
    //first user will be an admin
    role =isFirstAccount? 'admin':'user';
    //add new user 
    const user= await User.create({name,email,password,role});

    //payload for token creation
    const payload={
        name:user.name,
        userId:user._id,
        role:user.role
    }
    //create token and send as cookie
    attachCookieToResponse(res,payload);
    res.status(statusCode.CREATED).json({userId:user._id,name:user.name,role:user.role});
}

///---------------------- LOGIN USER ---------------------------------------------
exports.login=async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        throw new BadRequest('Invalid credintials');
    }
    //find user with given email
    const user =await User.findOne({email});
    if(!user){
        throw new unAuthenticatedError('user not found with given email');
    }

    //comparing password with --->one stored in db
    const isMatched=await user.comparePassword(password);
    
    if(!isMatched){
        throw new unAuthenticatedError('Incorrect Password');
    }
     //payload for token creation
     const payload={
        name:user.name,
        userId:user._id,
        role:user.role
    }
    //create token and attach it to cookie
    attachCookieToResponse(res,payload);
    res.status(statusCode.OK).json({userId:user._id,name:user.name,role:user.role});    
}

///----------------------- LOGOUT USER ------------------------------------------ 
exports.logOut=(req,res)=>{
    res.cookie('token','asdf',{
        expires:new Date(Date.now())
    });
    res.status(statusCode.OK).json({msg:'logged out'});  
}