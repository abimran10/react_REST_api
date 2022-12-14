const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const AbdullahSchema = new Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Image:{
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token:{ 
            type: String,
        }
    }] 

});
module.exports = mongoose.model('abdullahaddress', AbdullahSchema);