const mongoose = require("mongoose");
const joı = require('joi');


const Productİnfo = mongoose.Schema({
    Name:String,
    Price:Number,
    Description:String,
    İsActive:Boolean,
    Data:{
        type:Date,
        default:Date.now,
    }
})


const ValidateForm = (result) => {
    const schema = joı.object({
        Name:joı.string().min(3).max(15).required(),
        Price:joı.number().required(),
        Description:joı.string().min(3).max(30).required,
        İsActive:joı.boolean().required(),
    })

    return schema.validate(result);
}


const Products = mongoose.model("Product",Productİnfo);

module.exports =  {Products , ValidateForm};