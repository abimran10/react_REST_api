const jwt = require('jsonwebtoken');
const { Model } = require('mongoose');
const UserModel = require("../Model/user");

const auth =async (req,res,next)=>{
  try{
       const token = req.cookies.jwt;
       const verifyUser = jwt.verify(token,process.env.SECRET_KEY);
       console.log(verifyUser);
       console.log(verifyUser._id);
       const user = await UserModel.findOne({_id:verifyUser._id})
       console.log("usertokenvalid",user.firstName);

       req.token = token;
       req.user = user;
       next();
       
  }catch(err){
       res.status(401).send(err);
  }

}
// function authenticateToken(req, res, next) {
// const authHeader = req.headers['authorization']
// const token = authHeader && authHeader.split(' ')[1]

//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
//     console.log(err)

//     if (err) return res.sendStatus(403)

//     req.user = user

//     next()
//   })
// }
module.exports = auth;