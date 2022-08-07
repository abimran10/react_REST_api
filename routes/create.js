const express = require('express');
const { CreateForm,PostDb } = require('../Controllers/createControllers');
// const AbdullahModel = require("../Model/Abdullah model");
// const { CreateStudent } = require('./Controllers/studentControler');
const router=express.Router();
// router.get('AddUser', CreateStudent)
///data
    
  router.get('/CreateFormDisplay',CreateForm );
  router.post('/createpostdisplay', PostDb );
//   router.get('/student/read', (req, res) => {
//     res.send('Hello World4!')
//   })

  module.exports = router