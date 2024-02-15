const statusCode=require('http-status-codes');
const User=require('../models/user');
const ObjectId = require('mongodb').ObjectId;
const {BadRequest,CustomAPIError,notFound}=require('../errors');

exports.getSingleUser=async (req,res)=>{
    
    //get id from params
    const {id:userId}=req.params;
    const singleUser= await User.findOne({_id:userId,role:'user'},{password:0});
    if(!singleUser){
        throw new notFound(`no user found with this ${userId} Id`);
    }
    res.status(statusCode.OK).json({singleUser});
}

exports.getAllUsers=async (req,res)=>{
    //find all users
    const users= await User.find({role:'user'},{password:0});
    if(users.length==0){
        throw new notFound('No users found');
    }
    res.status(statusCode.OK).json({msg:'all users',users});
}
exports.showCurrentUser=(req,res)=>{
    res.status(statusCode.OK).json({msg:'current user'});
}

exports.updateUser=(req,res)=>{
    res.status(statusCode.OK).json({msg:'update user'});
}
exports.updateUserPassword=(req,res)=>{
    res.status(statusCode.OK).json({msg:'update password'});
}