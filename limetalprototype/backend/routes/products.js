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


 // API for searching a Product

    router.post("/searchOrder/:curr_page/:curr_count",async (req,res)=>{

        const {productName} = req.body;
        
        const total_count_array =  await db.runQuery(`SELECT COUNT(*) AS total_records FROM allservices WHERE serviceName LIKE '%${productName}%'`);

        let cur_records = await db.runQuery(`SELECT * FROM allservices WHERE serviceName LIKE '%${productName}%' LIMIT ${req.params.curr_page * 10},${req.params.curr_count}`);

        let result ={
            total_count:total_count_array[0].total_records,
            cur_records:cur_records,
            message:"Success"
      };
      res.status(201).send({message:"Successfull",data:result});
    });

// SORT Product By Type API

router.post("/filterServices/:curr_page/:curr_count",async (req,res)=>{

    const {category} = req.body;
    const {filter} = req.body;
    const total_count_array =  await db.runQuery(`SELECT COUNT(*) AS total_records FROM allservices WHERE ${category} IN (${filter})`);
    let cur_records = await db.runQuery(`SELECT * FROM allservices WHERE ${category} IN (${filter}) LIMIT ${req.params.curr_page * 10},${req.params.curr_count}`);
    let result ={
        total_count:total_count_array[0].total_records,
        cur_records:cur_records,
        message:"Success"
  };
  res.status(201).send({message:"Successfull",data:result});
});


// SEARCH BY PRODUCT AND TYPE

router.post("/advanceSearch/:curr_page/:curr_count",async (req,res)=>{
    const {searchWord} = req.body;
try{
    const total_count_array = await db.runQuery(`SELECT COUNT(*) AS total_records FROM allServices WHERE serviceName LIKE '%${searchWord}%' OR type IN ('${searchWord}')`);

    let cur_records = await db.runQuery(`SELECT * FROM allServices WHERE serviceName LIKE '%${searchWord}%' OR type IN ('${searchWord}') LIMIT ${req.params.curr_page * 10},${req.params.curr_count}`);

    let result ={
        total_count:total_count_array[0].total_records,
        cur_records:cur_records,
        message:"Success"
  };
  res.status(201).send({message:"Successfull",data:result});  
}
catch(err)
    {
        res.status(404).send(err);
    }
});

    //Edit Product API

router.post("/editProduct/:id",(req,res)=>{

    // const {id} = req.body;
    const {productName} = req.body;
    const {description} = req.body;
    const {type} =req.body;

    db.query("UPDATE allservices SET serviceName=?,description=?,type=? WHERE id=?",[productName,description,type,req.params.id],(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.status(201).send({message:"Product Upated Successfully"});
    });
});

// Get The Tax Details 

router.get("/taxDetails",async(req,res)=>{

    db.query("SELECT * FROM qbtax",(err,result)=>{

        if(err)
        {
            throw err;
        }

        res.status(201).send({message:"Successfull",data:result});
    });
});

// GET all the Approvers

router.get('/getApprovers',(req,res)=>{
 
    db.query('SELECT * FROM approvers',(err,result)=>{

        if(err)
        {
          return res.status(500).json({success:false,message:err});
        }
        else{
          return res.status(201).send({success:true,data:result});
        }
    });

});

 
module.exports = router;