const joi = require("joi") 
const schema = joi.object({
    FirstName: joi.string().max(100).required(),
    LastName: joi.string().max(100).required(),
    Email: joi.string().max(100).required(),
    Password: joi.string().regex(RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8}$")).required()
})
const schema1 = joi.object({
    Password: joi.string().regex(RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8}$")).required()
})

module.exports = {schema,schema1};

