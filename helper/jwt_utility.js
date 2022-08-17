const jwt= require('jsonwebtoken');
const generatetoken =async (userid)=>{
    console.log("Token_Id",userid);
    try{
            console.log(userid._id);
          const token = await jwt.sign({_id:userid.toString()},process.env.SECRET_KEY); 
          console.log("checkToken:",token);  
        //   UserRegister.tokens = UserRegister.tokens.concat({token});
              return token;
          }catch(err){  
                 console.log("err",err);
          } 
}  

module.exports = generatetoken; 
