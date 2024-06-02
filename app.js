const express = require("express");
const app = express();
const product = require('./routes/product');
const mongoose = require("mongoose");


app.use(express.json())
app.use('/products',product);

(async () => {

    try{
        await mongoose.connect("mongodb+srv://Tolunays:124578963@cluster0.6ddows8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("MongoDp bağlantısı yapıldı")
    }

    catch(err){
        console.log(err);
    }

})()


app.listen(5000,() => {
    console.log("Api Start")
})