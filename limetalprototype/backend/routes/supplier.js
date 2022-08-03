const express = require('express');
var router = express.Router();
const db = require('../helpers/db');

// Create a Supplier

    router.post('/createSupplier',(req,res)=>{
        const {supplierName} = req.body.supplierDetails;
        const {company} = req.body.supplierDetails;
        const {streetAddress} = req.body.supplierDetails;
        const {city} = req.body.supplierDetails;
        const {Province} = req.body.supplierDetails;
        const {country} = req.body.supplierDetails;
        const {postalCode} = req.body.supplierDetails;
        const {taxSlip} = req.body.supplierDetails;
        const {phone} = req.body.supplierDetails;
        const {email} = req.body.supplierDetails;
        const {openBalance}= req.body.supplierDetails;
        const {supplierNumber} = req.body.supplierDetails;
        const {currency} = req.body.supplierDetails;
        db.query("INSERT INTO suppliertable (supplier,company,streetAddress,city,Province,Country,postalCode,taxSlip,phone,email,openBalance,supplierNumber,currency) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",[supplierName,company,streetAddress,city,Province,country,postalCode,taxSlip,phone,email,openBalance,supplierNumber,currency],(err,result)=>{
            if(err)
                {
                    throw err;
                }
            res.status(201).send({message:'Supplier Successfull Created'});
        })
    });

    // Edit or Update a Supplier

    router.post("/editSupplier/:id",(req,res)=>{
        const {supplierName} = req.body.supplierDetails;
        const {company} = req.body.supplierDetails;
        const {streetAddress} = req.body.supplierDetails;
        const {city} = req.body.supplierDetails;
        const {Province} = req.body.supplierDetails;
        const {country} = req.body.supplierDetails;
        const {postalCode} = req.body.supplierDetails;
        const {taxSlip} = req.body.supplierDetails;
        const {phone} = req.body.supplierDetails;
        const {email} = req.body.supplierDetails;
        const {openBalance}= req.body.supplierDetails;
        const {supplierNumber} = req.body.supplierDetails;
        const {currency} = req.body.supplierDetails;

        db.query("UPDATE suppliertable SET supplier=?,company=?,streetAddress=?,city=?,Province=?,Country=?,postalCode=?,taxSlip=?,phone=?,email=?,openBalance=?,supplierNumber=?,currency=? WHERE id=?",[supplierName,company,streetAddress,city,Province,country,postalCode,taxSlip,phone,email,openBalance,supplierNumber,currency,req.params.id],(err,result)=>{

            if(err)
            {
                throw err;
            }
            else
            {
                res.status(201).send({message:'Supplier Successfull Updated'});
            }
        });


    });

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

// Get SupplierName and SupplierNumber
    router.get('/getSuppliers',async (req,res)=>{
        try {

            db.query('SELECT supplier,supplierNumber FROM suppliertable',(err,result)=>{

                if(err)
                    {
                        throw err;
                    }
                    else
                    {
                        res.status(201).send({message:"Successfull",data:result});
                    }
            });
        }
        catch(e)
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