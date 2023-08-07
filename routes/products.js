var express = require('express');
var router = express.Router();
const {Product} = require("../models")
const Validator = require("fastest-validator")

const v = new Validator()

// menampilkan semua data 
router.get("/", async(req,res)=>{
    const product= await Product.findAll()
   return res.json(product)
});

// menampilkan berdasarkan id
router.get("/:id", async(req,res) =>{
    const id = req.params.id

    const productId= await Product.findByPk(id)

    if(!productId){
        return res.status(404).json({
            message: "Data not found"
        })
    }
    return res.json(productId)
})

// menambahkan data baru
router.post("/", async (req,res) => {
    const schema = {
        name: "string",
        brand: "string",
        description: "string|optional"
    }

    const validate = v.validate(req.body, schema) // mengembalikan niai boolean

    if(validate.length){
        return res.status(400).json(validate)
    }

    const product = await Product.create(req.body);
    res.json(product);
})

// mengubah data
router.put("/:id", async (req, res) => {
    const id= req.params.id

    let productId= await Product.findByPk(id)

    if(!productId){
        return res.json({
            message: "Product not found🤣"
        })
    }

    const schema = {
        name: "string|optional",
        brand: "string|optional",
        description: "string|optional"
    }

    const validate= v.validate(req.body, schema);

    if(validate.length){
        return res.status(404)
        .json(validate)
    }
   let productUpdate= await productId.update(req.body);
    
    res.json(productUpdate)
})

// menghapus data
router.delete("/:id", async (req,res)=>{
    const id = req.params.id;

    const productId = await Product.findByPk(id);

    if(!productId){
        return res.status(400).json({
            message: "id "+ id + " not found"
        })

    }

    await productId.destroy();
    return res.json({
        message: "id: " + id + " has been deleted"
    })
})


module.exports = router