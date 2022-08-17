require('dotenv').config();
console.log(process.env.SECRET_KEY);
const generatetoken = require("./helper/jwt_utility");
const auth = require('./middleware/Auth')
// app.set('view engine','ejs');
// app.set('view engine', 'html');
// app.use(express.static(__dirname + './index'));
// const { Router } = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const connectToMongo = require("./Database/db");
connectToMongo();
var bodyParser = require("body-parser");
var md5 = require('md5');
const ejs = require("ejs");
const express = require("express");
const UserModel = require("./Model/user");
const { findById } = require("./Model/user");
const app = express();
const port = 3000;
app.use(express.static('uploads'))
app.use(express.json());
app.use(cookieParser());
app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: "application/*+json" }));
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
// parse an HTML body into a string
app.use(bodyParser.text({ type: "text/html" }));
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// ROUTER

const CRUD = require('./routes/CRUD');
const { request } = require("express");





app.use('/',CRUD);


app.get('/header', (req, res) => {
  res.render('header');
})

app.get('/SECRET',auth,(req, res) => {
  res.render('SECRET');
})

app.get('/LOGOUT',auth,async (req, res) => {
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
})




app.get('/UserLogin', (req, res) => {
  res.render('userlogin');
})
app.get('/RegisterForm',(req, res)=>{
  res.render('registerform')
})
app.post('/Registerpost',async (req,res) => {
  console.log("registerPost");
  let UserRegister = new UserModel({
    firstName: req.body.FirstName,
    lastName: req.body.LastName,
    Email: req.body.Email,
    password: md5(req.body.Password),
  });
  const token =await generatetoken(UserRegister._id);
  console.log("tokenPart:",token);
  UserRegister.tokens = UserRegister.tokens.concat({token});
  res.cookie("jwt",token,{
    expires:new Date(Date.now()+3000),
    httpOnly:true
  });

  //  async()=> {
  //   try{
  //     console.log(UserRegister._id);
  //   const token = await jwt.sign({_id:UserRegister._id.toString()},process.env.SECRET_KEY); 
  //   console.log(token);  
  //   UserRegister.tokens = UserRegister.tokens.concat({token});
  //   await UserRegister.save();


  //   }catch(err){  
  //          console.log("err",err);
  //   } 
    
  // }
  // token();


  UserRegister.save();


  res.redirect("http://localhost:3000/RegisterForm");
});

app.post('/UserLoginPost',async (req,res) => {
  console.log("welcome to User Login");
  const email= req.body.Email;
  const password=req.body.Password;
  console.log("Email:",email,"Password:",password);
  const UserEmail = await UserModel.findOne({Email:email,password:md5(password)});
  console.log(UserEmail);
  const token = await generatetoken(UserEmail._id);
  console.log("tokenPart:",token);
  UserEmail.tokens = UserEmail.tokens.concat({token});

  res.cookie("jwt",token,{
    expires:new Date(Date.now()+900000),
    httpOnly:true
  });

  // async()=> {
  //   try{
  //     console.log(UserEmail._id);
  //   const token = await jwt.sign({_id:UserEmail._id.toString()},process.env.SECRET_KEY); 
  //   console.log(token);  
  //   UserEmail.tokens = UserEmail.tokens.concat({token});
  //   await UserEmail.save();       


  //   }catch(err){  
  //          console.log("err",err);
  //   } 
    
  // }
  // token();
  UserEmail.save();
  // res.render('AddUser');
  res.redirect("http://localhost:3000/");
})


// const createToken = async()=>{
//   const token = await jwt.sign({_id:"62f38bd5c47a154513f03fc0"},"hey Abdullah");
  
// console.log("token:",token);
//   const userVer = await jwt.verify(token,"hey Abdullah");
//   console.log(userVer);
// }

// createToken();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

































































// app.get("/", (req, res) => {
//   UserModel.find({}, function (err, abdullahaddress) {
//     res.render("index", {
//       registerlist: abdullahaddress,
//     });
//   });
// });

// app.get('/create/CreateFormDisplay', (req, res) => {
//   res.render('AddUser');
// });



// app.post("/createpostdisplay", async (req, res) => {
//   let newNote = new UserModel({
//     firstName: req.body.FirstName,
//     lastName: req.body.LastName,
//     Email: req.body.Email,
//   });
//   newNote.save();

//   res.redirect("http://localhost:3000/create/CreateFormDisplay");
// });


// app.delete("/delete/:id", function (req, res) {
//   id = req.params.id;
//   UserModel.findOneAndDelete({ _id: id }, function (err, val) {
//   //  res.redirect("http://localhost:3000/");
//     res.status(200).send('successfully deleted.');
    
//   });
// });



// app.get("/edit/:_id", async function (req, res) {
//   console.log("hhs");
//   console.log(req.params._id);
//   const abdullahaddress = await UserModel.findById(req.params._id);

//   console.log("data1", abdullahaddress);

//   if (abdullahaddress) {
    

//     res.render("editform", { users: abdullahaddress });
//   }
// });



// app.post("/edit/:_id", async function(req, res) {
//    console.log("My ID IS",req.params._id)
//     const mybodydata={
//       firstName:req.body.FirstName,
//       lastName:req.body.LastName,
//       Email:req.body.Email
//     }
//     console.log(mybodydata)
//     UserModel.findByIdAndUpdate(req.params._id, mybodydata , function (err, result) {
//     if(err){
//       // req.flash('error_msg', 'Something went wrong! User could not updated.');
//       console.log(err);
//   } else {
//     console.log(result);
//     // req.flash('success_msg', 'Record Updated');
//     res.redirect('http://localhost:3000/');
//   }
//    });
// });




















// UserModel.findById(1, function(err,abdullahaddress){
  //   console.log("abdullahaddress!",abdullahaddress);

  //  });
  //find({_id:req.params.id}, function(err,abdullahaddress){
  //   console.log("abdullahaddress!",abdullahaddress);

  //  });
  //  UserModel.findById(req.params.id, function(err, abdullahaddress) {

  //   });
// app.get("/create/CreateFormDisplay", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
//  app.delete('/fetch/:firstname',function (req,res){
//       fetchname=req.params.name;
//        UserModel.findOneAndDelete(({name:fetchname}),function(err,docs){
//            res.send(docs);
//         })
//  })
//  app.put('/update/:firstName',function (req,res){
//           let upfirstName=req.params.firstName;
//           let uplastName= req.body.lastName;
//           let upEmail= req.body.Email
//           UserModel.findOneAndUpdate(({firstName:upfirstName}),{$set:{lastName:uplastName,Email:upEmail}},{new:true},function(err,data){
//             if(data==null){
//               res.send("nothing")
//             }
//             else{
//               res.send(data);
//             }

//           })
//  })
// app.get('/', (req, res) => {
//   res.sendFile(__dirname+'/index.html')
// })
// app.post("/addUser", async (req, res) => {
//   try {
//     console.log(req.body);
//     const UserModel = UserModel(req.body);
//     const response = await UserModel.save();
//     res.send(response);
//   } catch (error) {
//     console.log(error.message);
//     res.send(error);
//   }
// });
// app.get("/User", function (req, res) {
//   UserModel.find(function (err, val) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(val);
//     }
//   });
// });
