const express = require('express');
const router=express.Router();
const {LOGOUT , UserLogin ,RegisterForm ,Registerpost,UserLoginPost} = require('../Controllers/loginRegisterControllers');
const auth = require('../middleware/Auth');
const {addUserValidation} = require("../middleware/user.validation")

router.get('/LOGOUT',auth,LOGOUT);
router.get('/UserLogin',UserLogin);
router.get('/RegisterForm',RegisterForm);
router.post('/Registerpost',addUserValidation,Registerpost);
router.post('/UserLoginPost',UserLoginPost);





module.exports = router