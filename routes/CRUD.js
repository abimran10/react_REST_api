const express = require('express');
const { UserData,CreateForm,PostDb,DeleteData,updateForm,PostUpdateData } = require('../Controllers/crudControllers');
const router=express.Router();
const {userImageUpload} = require('../helper/userImage');
  router.get('/', UserData);

  router.get('/create/CreateFormDisplay',CreateForm);

  router.post('/create/createpostdisplay',userImageUpload.single('image'),(req,res) => PostDb(req,res));

  router.delete('/delete/:id', DeleteData);

  router.get('/edit/:_id', updateForm);
  
  router.post('/edit/:_id',userImageUpload.single('image'), PostUpdateData );
  
  module.exports = router