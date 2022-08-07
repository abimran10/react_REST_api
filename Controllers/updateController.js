const AbdullahModel = require("../Model/Abdullah model");

const updateForm =  async function (req, res) {
    console.log("hhs");
    console.log(req.params._id);
    const abdullahaddress = await AbdullahModel.findById(req.params._id);
  
    console.log("data1", abdullahaddress);
  
    if (abdullahaddress) {
      
  
      res.render("editform", { users: abdullahaddress });
    }
  }
  const PostUpdateData =  async function(req, res) {
    console.log("My ID IS",req.params._id)
     const mybodydata={
       firstName:req.body.FirstName,
       lastName:req.body.LastName,
       Email:req.body.Email
     }
     console.log(mybodydata)
     AbdullahModel.findByIdAndUpdate(req.params._id, mybodydata , function (err, result) {
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

 module.exports = {updateForm,PostUpdateData}; 