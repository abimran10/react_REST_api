const UserModel = require("../Model/user");
const generatetoken = require("../helper/jwt_utility");
var md5 = require('md5');

const LOGOUT = async (req, res) => {
    try{
     console.log(req.user);
     
     req.user.tokens = req.user.tokens.filter((Currenttoken)=>{
            return  Currenttoken.token !== req.token;
     })
    //  req.user.tokens = [];
  
     res.clearCookie("jwt");
     console.log("logout");
     await req.user.save();
     res.render('userlogin');
    }catch(err){
      res.status(500).send(err);
    }
  }
const UserLogin = (req, res) => {
    res.render('userlogin');
  }

const RegisterForm = (req, res)=>{
    res.render('registerform')
  }

const Registerpost = async (req,res) => {
    console.log("registerPost");
    let UserRegister = new UserModel({
      firstName: req.body.FirstName,
      lastName: req.body.LastName,
      Email: req.body.Email,
      password: md5(req.body.Password),
    });
  
    UserRegister.save();
  
  
    res.redirect("http://localhost:3000/RegisterForm");
  }
  
const UserLoginPost = async (req,res) => {
    console.log("welcome to User Login");
    const email= req.body.Email;
    const password=req.body.Password;
    console.log("Email:",email,"Password:",password);
    const UserEmail = await UserModel.findOne({Email:email,password:md5(password)});
    if(!UserEmail){
      console.log("Not Found User");
      res.status(400).send("You have entered an invalid username or password");
    }
    else{
    console.log(UserEmail);
    const token = await generatetoken(UserEmail._id);
    console.log("tokenPart:",token);
    UserEmail.tokens = UserEmail.tokens.concat({token});
  
    res.cookie("jwt",token,{
      expires:new Date(Date.now()+900000),
      httpOnly:true
    });
  
    UserEmail.save();
    res.redirect("http://localhost:3000/");
  }
  }  



module.exports = {LOGOUT , UserLogin ,RegisterForm ,Registerpost,UserLoginPost}; 