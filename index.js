require('dotenv').config();
//All Required
console.log(process.env.SECRET_KEY);

const generatetoken = require("./helper/jwt_utility");
const auth = require('./middleware/Auth')
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const connectToMongo = require("./Database/db");
connectToMongo();
var bodyParser = require("body-parser");
var md5 = require('md5');
const ejs = require("ejs");
const { request } = require("express");
const express = require("express");
const UserModel = require("./Model/user");
const { findById } = require("./Model/user");
const app = express();
const port = 3000;
//app.use middleware
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
const loginRegister = require('./routes/loginRegister'); 
const { compileString } = require('sass');
const user = require('./Model/user');
const  transporter  = require('./Database/emailConfig');

// fazool
// app.set('view engine','ejs');
// app.set('view engine', 'html');
// app.use(express.static(__dirname + './index'));
// const { Router } = require("express");

app.use('/',CRUD);
app.use('/',loginRegister);



app.get('/header', (req, res) => {
  res.render('header');
})

app.get('/forgetpassword',(req, res)=>{
  try{
   res.render('forgotpassword');
  }catch(error){
    console.log(error);
  }
});
app.post('/resetemail',async(req,res)=>{
  //  res.send("chalgeya ma");
   const email=req.body.Email;
   if(email){
    const user = await  UserModel.findOne({Email:email});
     if(user){
       const secret = user._id + process.env.SECRET_KEY;
       const token = jwt.sign({_id:user._id},secret)
       const link = `http://127.0.0.1:5000/api/user/reset/${user._id}/${token}`
       console.log(link);
       //send email
       let info = await transporter.sendMail({
        from:process.env.EMAIL_FROM,
        to:user.Email,
        subject:"AbdullahImran__RESET PASSWORD LINK",
        html: `<a href=${link}>Click HERE</a> TO RESET YOUR PASSWORD` 
       })
       res.send("successful email sent reset password");
     }else{
        res.send("email not found");
     }
}else{
    res.send("email field required");
}
})

app.get('ResetPassword',async(req,res)=>{
  
})
app.post('/UserResetPassword',async(req,res)=>{


});



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
