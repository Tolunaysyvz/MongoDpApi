const express = require("express");

const route = express.Router();
const { Products , ValidateForm } = require('../mongoSchema/productSchema');

route.get('/' , async (req,res) => {
   const product = await Products.find();
   res.send(product);
})

route.get('/:id', async (req,res) => {
    const productid = await Products.findById(req.params.id);

    if(!productid){
        res.status(404).send("Aradığınız Ürün yok")
    }

    res.send(productid);
})


route.post('/', async (req,res) => {

    const { error  } = ValidateForm(req.body);
    if(error){
       return res.status(404).send(error.details[0].message);
    }

    const Data = new Products({
        Name:req.body.Name,
        Price:req.body.Price,
        Description:req.body.Description,
        İsActive:req.body.İsActive,
    })

 
    const data = await Data.save();
    console.log(data);
    
    res.send(data);
})




route.put('/:id', async (req,res) => {
    const product = await Products.findById(req.params.id);

    if(!product){
        return res.status(404).send("Aradığınız Ürün Bulunamadı");
    }

    const { error  } = ValidateForm(req.body);
    if(error){
       return res.status(404).send(error.details[0].message);
    }

    product.Name = req.body.Name;
    product.Price = req.body.Price;
    product.Description = req.body.Description;
    product.İsActive = req.body.İsActive;


    const productupt = await product.save();

    res.send(productupt);   

})

route.delete('/:id', async (req,res) => {
    

    const productDelete = await Products.findByIdAndDelete(req.params.id);
    if(!productDelete){
       return res.status(404).send('Aradığınız Ürün Bulunamadı')
    }

    res.send(productDelete);
})

module.exports = route;