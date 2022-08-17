const UserModel = require("../Model/user");
var md5 = require('md5');

const UserData = (req, res) => {
  console.log("helllooo1");
  //res.send("data..............");
  try{
    UserModel.find({}, function (err, abdullahaddress) {
      console.log("helllooo",abdullahaddress);
      res.render("index", {
        registerlist: abdullahaddress,
      });
    });
  }
    catch(ex){
      console.log("ex",ex);
      res.send(ex);
    }
  }

const CreateForm = (req, res ) => {
    res.render('AddUser');
  }
  
const PostDb = async (req,res) => {
    // console.log("filename 222222",req.file);
    try{
    let newNote = new UserModel({
      firstName: req.body.FirstName,
      lastName: req.body.LastName,
      Email: req.body.Email,
      Image: req.file.filename,
      password: md5('123')

    });
    newNote.save();
  
    res.redirect("http://localhost:3000/create/CreateFormDisplay");
    }
    catch(err){
      console.log("error",error)
    }
  }

  const DeleteData = function (req, res) {
    id = req.params.id;
    UserModel.findOneAndDelete({ _id: id }, function (err, val) {
    //  res.redirect("http://localhost:3000/");
      res.status(200).send('successfully deleted.');
      
    });
  }

  const updateForm =  async function (req, res) {
    console.log("hhs");
    console.log(req.params._id);
    const abdullahaddress = await UserModel.findById(req.params._id);
  
    console.log("data1", abdullahaddress);
  
    if (abdullahaddress) {
      
  
      res.render("editform", { users: abdullahaddress });
    }
  }

  const PostUpdateData =  async function(req, res) {
    console.log("My ID IS",req.params._id)
    let new_image = '';
    if(req.file){
      new_image = req.file.filename;
      try{
        fs.unlink.Sync('./uploads'+req.body.old_image);
      } catch(err){
        console.log(err);
      }
    }else{
       new_image = req.body.old_image;
    }

     const mybodydata={
       firstName:req.body.FirstName,
       lastName:req.body.LastName,
       Email:req.body.Email,
       Image: new_image,
     }
     console.log(mybodydata)
     UserModel.findByIdAndUpdate(req.params._id, mybodydata , function (err, result) {
     if(err){
       // req.flash('error_msg', 'Something went wrong! User could not updated.');
       console.log(err);
   } else {
     console.log(result);
     // req.flash('success_msg', 'Record Updated');
     res.redirect('http://localhost:3000/');
   }
    });
 }

//  module.exports = {UserData}; 
 module.exports = {UserData,CreateForm,PostDb,DeleteData,updateForm,PostUpdateData}; 