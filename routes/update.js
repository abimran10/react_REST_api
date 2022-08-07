const express = require('express');
const AbdullahModel = require("../Model/Abdullah model");
const { updateForm,PostUpdateData } = require('../Controllers/updateController');
const router=express.Router();
// router.get('AddUser', CreateStudent)
    
  router.get('/:_id',updateForm);
  
  router.post('/:_id',PostUpdateData);
 

  module.exports = router