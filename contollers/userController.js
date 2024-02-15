const statusCode=require('http-status-codes');
const User=require('../models/user');
const {BadRequest,CustomAPIError}=require('../errors');

exports.getSingleUser=(req,res)=>{

    res.status(statusCode.OK).json({msg:'single user'});
}

exports.getAllUsers=(req,res)=>{
    res.status(statusCode.OK).json({msg:'all user'});
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