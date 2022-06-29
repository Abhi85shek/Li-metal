const express = require('express');
var router = express.Router();
const db = require('../helpers/db');


// Get All Product API

router.get("/allProducts",(req,res)=>{

        db.query("SELECT * FROM allservices",(err,result)=>{
            if(err)
                {
                    throw err;
                }
            res.send(result);

        });



});

// Get All Product API WHICH ARE CURRENTLY ACTIVE

router.get('/allProductsActive',(req,res)=>{

    db.query("SELECT * FROM allservices WHERE active=?",[1],(err,result)=>{
        if(err)
            {
                throw err;
            }
            res.send(result);

    });
});


// CREATE Product API

router.post("/createProduct",(req,res)=>{

    
    const {productName} = req.body;
    const {productDescription} = req.body;
    const {type} = req.body;
    db.query("INSERT INTO allServices (serviceName,description,type) VALUES (?,?,?)",[productName,productDescription,type],(err,result)=>{
        if(err)
        {
            throw err;
        }      
        res.status(200).send({message:"SuccessFully Created"});

    });
});

// SORT Product By Type API

router.post("/sortByType",(req,res)=>{

    const {type} = req.body;

    db.query("SELECT * FROM allservices WHERE type=?",[type],(err,result)=>{

        if(err)
        {
            throw err;
        }
        res.send(result);

    });
});

// Archive Product API

router.post("/archiveProductById",(req,res)=>{

    const {id} =req.body;

    db.query("UPDATE allservices SET active=? WHERE id=?",[0,id],(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json({message:"Product Archive Successfully"});
    });
});


// Update Product API

router.post("/updateProduct",(req,res)=>{

    const {id} = req.body;
    const {productName} = req.body;
    const {description} = req.body;
    const {type} =req.body;

    db.query("UPDATE allservices SET serviceName=?,description=?,type=? WHERE id=?",[productName,description,type,id],(err,result)=>{

        if(err)
        {
            throw err;
        }

        res.status(201).send({message:"Product Upated Successfully"});

    });

});

module.exports = router;