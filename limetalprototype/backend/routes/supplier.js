const express = require('express');
var router = express.Router();
const db = require('../helpers/db');


// Get all Suppliers

router.get('/allSuppliers/:curr_page/:curr_count',async (req,res)=>{
    try{
    const total_count_array = await db.runQuery(`SELECT COUNT(*) AS total_records FROM suppliertable`);

    let cur_records = await db.runQuery(`SELECT * FROM suppliertable LIMIT ${req.params.curr_page * 10},${req.params.curr_count}`);

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

// Search a Supplier


    router.post('/searchSupplier/:curr_page/:curr_count',async(req,res)=>
    {

    const {supplierName} = req.body;
        
    const total_count_array =  await db.runQuery(`SELECT COUNT(*) AS total_records FROM suppliertable WHERE supplier LIKE '%${supplierName}%'`);

    let cur_records = await db.runQuery(`SELECT * FROM suppliertable WHERE supplier LIKE '%${supplierName}%' LIMIT ${req.params.curr_page * 10},${req.params.curr_count}`);

    let result ={
        total_count:total_count_array[0].total_records,
        cur_records:cur_records,
        message:"Success"
  };
  res.status(201).send({message:"Successfull",data:result});
    });


module.exports = router;