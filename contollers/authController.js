const User=require('../models/user');
const {BadRequest,CustomAPIError,unAuthenticatedError}=require('../errors');
const statusCode=require('http-status-codes')

exports.register=async (req,res)=>{
    const user={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role
    };
    //checking for existing user
    const exUser= await User.find({email:user.email});
    if(exUser){
        throw new BadRequest('User Already exists with this email');
    }
    const addedUser= await User.create(user);
    res.status(statusCode.CREATED).json({msg:'user created',addedUser});


}
exports.login=(req,res)=>{
    res.send('login route')
    
}
exports.logOut=(req,res)=>{
    res.send('logout route')    
}