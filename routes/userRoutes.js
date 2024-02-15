const express=require('express');
const {getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword}=require('../contollers/userController');
const authenticateUser=require('../middleware/authentication');
const router=express.Router();

//user routes---->PROTECTED ROUTES
//Get Routes
router.get('/',getAllUsers);
router.get('/showMe',showCurrentUser);
router.get('/:id',authenticateUser,getSingleUser);

//Patch Routes--->For Updating
router.patch('/updateUser',authenticateUser,updateUser);
router.patch('/updateUserPassword',authenticateUser,updateUserPassword);




module.exports=router;



