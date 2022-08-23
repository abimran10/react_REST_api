const USERS= require("../middleware/user.schema");
const RESET= require("../middleware/user.schema");
module.exports ={
    addUserValidation: async (req, res ,next)=>{
        const a ={
            FirstName:req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Password:req.body.Password
        }
        console.log(a);
        const error= await USERS.schema.validate(a); 
        if(error.error){
            res.status(400).send("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
            
        }else{
            next();
        }
    },
    ResetUserValidation:async (req, res ,next)=>{
        const b ={
            Password:req.body.Password
        }
        console.log(b);
        const error= await RESET.schema1.validate(b); 
        if(error.error){
            res.status(400).send("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
            
        }else{
            next();
        }
    }
};