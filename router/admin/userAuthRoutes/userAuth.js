const express = require("express");
const router=express.Router()
const userController=require('../../../controller/admin/userController')
const authenticate = require('../../../middleware/auth');


router.get('/signup',userController.getSignUp)
router.post('/signup',userController.signUp)
router.get('/login',userController.getLogIn)
router.get('/logout',authenticate,userController.logOut)
router.post('/login',userController.logIn)
router.get('/index',authenticate ,userController.index)


module.exports=router