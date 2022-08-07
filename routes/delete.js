const express = require('express');
// const AbdullahModel = require("../Model/Abdullah model");
const {DeleteData} = require('../Controllers/deleteControllers');
// const { CreateStudent } = require('./Controllers/studentControler');
const router=express.Router();
// router.get('AddUser', CreateStudent)
    
  router.delete('/:id', DeleteData);
//   router.get('/student/read', (req, res) => {
//     res.send('Hello World4!')
//   })

  module.exports = router