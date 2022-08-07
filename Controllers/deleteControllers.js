const AbdullahModel = require("../Model/Abdullah model");

const DeleteData = function (req, res) {
    id = req.params.id;
    AbdullahModel.findOneAndDelete({ _id: id }, function (err, val) {
    //  res.redirect("http://localhost:3000/");
      res.status(200).send('successfully deleted.');
      
    });
  }

 module.exports = {DeleteData}; 