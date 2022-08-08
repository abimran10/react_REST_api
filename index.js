// app.set('view engine','ejs');
// app.set('view engine', 'html');
// app.use(express.static(__dirname + './index'));
// const { Router } = require("express");
const multer = require('multer')
const connectToMongo = require("./db");
connectToMongo();
var bodyParser = require("body-parser");

const ejs = require("ejs");
const express = require("express");
const AbdullahModel = require("./Model/Abdullah model");
const { findById } = require("./Model/Abdullah model");
const app = express();
const port = 3000;
app.use(express.json());
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
const addUser = require('./routes/create')  
const UserData = require('./routes/read')
const deleteuser = require('./routes/delete')
const updateuser = require('./routes/update')





app.use('/',UserData);
app.use('/create',addUser);
app.use('/delete',deleteuser);
app.use('/edit',updateuser)

app.get('/header', (req, res) => {
  res.render('header');
})



//image upload
// var storage = multer.diskStorage({
//   destination: function(req,file,cb){
//      cb(null, './uploads')
//   },
//   filename: function(req,res,cb){
//     cb(null, file.fieldname+"_"+Date.now+"_"+file.originalname); 
//   }
// })
// var upload = multer({
//   storage: storage,

// }).single("image");



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

































































// app.get("/", (req, res) => {
//   AbdullahModel.find({}, function (err, abdullahaddress) {
//     res.render("index", {
//       registerlist: abdullahaddress,
//     });
//   });
// });

// app.get('/create/CreateFormDisplay', (req, res) => {
//   res.render('AddUser');
// });



// app.post("/createpostdisplay", async (req, res) => {
//   let newNote = new AbdullahModel({
//     firstName: req.body.FirstName,
//     lastName: req.body.LastName,
//     Email: req.body.Email,
//   });
//   newNote.save();

//   res.redirect("http://localhost:3000/create/CreateFormDisplay");
// });


// app.delete("/delete/:id", function (req, res) {
//   id = req.params.id;
//   AbdullahModel.findOneAndDelete({ _id: id }, function (err, val) {
//   //  res.redirect("http://localhost:3000/");
//     res.status(200).send('successfully deleted.');
    
//   });
// });



// app.get("/edit/:_id", async function (req, res) {
//   console.log("hhs");
//   console.log(req.params._id);
//   const abdullahaddress = await AbdullahModel.findById(req.params._id);

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
//     AbdullahModel.findByIdAndUpdate(req.params._id, mybodydata , function (err, result) {
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




















// AbdullahModel.findById(1, function(err,abdullahaddress){
  //   console.log("abdullahaddress!",abdullahaddress);

  //  });
  //find({_id:req.params.id}, function(err,abdullahaddress){
  //   console.log("abdullahaddress!",abdullahaddress);

  //  });
  //  AbdullahModel.findById(req.params.id, function(err, abdullahaddress) {

  //   });
// app.get("/create/CreateFormDisplay", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
//  app.delete('/fetch/:firstname',function (req,res){
//       fetchname=req.params.name;
//        AbdullahModel.findOneAndDelete(({name:fetchname}),function(err,docs){
//            res.send(docs);
//         })
//  })
//  app.put('/update/:firstName',function (req,res){
//           let upfirstName=req.params.firstName;
//           let uplastName= req.body.lastName;
//           let upEmail= req.body.Email
//           AbdullahModel.findOneAndUpdate(({firstName:upfirstName}),{$set:{lastName:uplastName,Email:upEmail}},{new:true},function(err,data){
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
//     const abdullahmodel = AbdullahModel(req.body);
//     const response = await abdullahmodel.save();
//     res.send(response);
//   } catch (error) {
//     console.log(error.message);
//     res.send(error);
//   }
// });
// app.get("/User", function (req, res) {
//   AbdullahModel.find(function (err, val) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(val);
//     }
//   });
// });
