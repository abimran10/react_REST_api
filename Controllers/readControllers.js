const AbdullahModel = require("../Model/Abdullah model");

const UserData = (req, res) => {
  console.log("helllooo1");
  //res.send("data..............");
  try{
    AbdullahModel.find({}, function (err, abdullahaddress) {
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

 module.exports = {UserData}; 