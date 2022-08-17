const express = require('express');
const router=express.Router();
const {LOGOUT , UserLogin ,RegisterForm ,Registerpost,UserLoginPost} = require('../Controllers/loginRegisterControllers');
const auth = require('../middleware/Auth');


router.get('/LOGOUT',auth,LOGOUT);
router.get('/UserLogin',UserLogin);
router.get('/RegisterForm',RegisterForm);
router.post('/Registerpost',Registerpost);
router.post('/UserLoginPost',UserLoginPost);





module.exports = router