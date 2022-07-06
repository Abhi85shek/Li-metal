const express = require('express');
var router = express.Router();
const db = require('../helpers/db');

// Get All Product API

router.get("/allProducts/:curr_page/:curr_count",async (req,res)=>{

    let total_count_array = await db.runQuery(`SELECT COUNT(*) AS total_records FROM allservices`);

    let cur_records = await db.runQuery(`SELECT * FROM allservices LIMIT ${req.params.curr_page * 10},${req.params.curr_count}`);

    let result ={
        total_count:total_count_array[0].total_records,
        cur_records:cur_records,
        message:"Success"
    };
     res.status(201).send({message:"Successfull",data:result});
        // db.query("SELECT * FROM allservices",(err,result)=>{
        //     if(err)
        //         {
        //             throw err;
        //         }
        //     res.send(result);

        // });
});

// API for 
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
    db.query("INSERT INTO allServices (serviceName,description,type,active) VALUES (?,?,?,?)",[productName,productDescription,type,"1"],(err,result)=>{
        if(err)
        {
            throw err;
        }else
        {
            res.status(200).send({message:"SuccessFully Created"});
        }
        
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
    const {active} = req.body;
    
    db.query("UPDATE allservices SET active=? WHERE id=?",[active,id],(err,result)=>{
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