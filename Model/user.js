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
        require: true
    }
});
module.exports = mongoose.model('abdullahaddress', AbdullahSchema);