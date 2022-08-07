const AbdullahModel = require("../Model/Abdullah model");

const UserData = (req, res) => {
    AbdullahModel.find({}, function (err, abdullahaddress) {
      res.render("index", {
        registerlist: abdullahaddress,
      });
    });
  }

 module.exports = {UserData}; 