const AbdullahModel = require("../Model/Abdullah model");


const CreateForm = (req, res ) => {
    res.render('AddUser');
  }
const PostDb = async (req, upload, res) => {
    let newNote = new AbdullahModel({
      firstName: req.body.FirstName,
      lastName: req.body.LastName,
      Email: req.body.Email,
      Image: req.file?req.file.fileimage:'',

    });
    newNote.save();
  
    res.redirect("http://localhost:3000/create/CreateFormDisplay");
  }

 module.exports = {CreateForm,PostDb}; 