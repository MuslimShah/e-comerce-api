const {getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword}=require('../contollers/userController');
const express=require('express');
const router=express.Router();

//user routes
router.get('/',getAllUsers);

module.exports=router;



