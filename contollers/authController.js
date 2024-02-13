const User=require('../models/user');
const {BadRequest,CustomAPIError,unAuthenticatedError}=require('../errors');
const statusCode=require('http-status-codes')


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
    //create token
    const token=await user.createToken();
    res.status(statusCode.CREATED).json({userId:user._id,name:user.name,role:role,token});
}

///---------------------- LOGIN USER ---------------------------------------------
exports.login=(req,res)=>{
    res.send('login route')
    
}

///----------------------- LOGOUT USER ------------------------------------------ 
exports.logOut=(req,res)=>{
    res.send('logout route')    
}