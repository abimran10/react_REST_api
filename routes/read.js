const express = require('express');
// const AbdullahModel = require("../Model/Abdullah model");
const {UserData} = require('../Controllers/readControllers');
// const { CreateStudent } = require('./Controllers/studentControler');
const router=express.Router();
// router.get('AddUser', CreateStudent)
    
  router.get('/', UserData);
//   router.get('/student/read', (req, res) => {
//     res.send('Hello World4!')
//   })

  module.exports = router