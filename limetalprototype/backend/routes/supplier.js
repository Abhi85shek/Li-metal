const express = require('express');
var router = express.Router();
const db = require('../helpers/db');




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



module.exports = router;