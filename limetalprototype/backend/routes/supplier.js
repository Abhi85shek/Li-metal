const express = require('express');
const { qb } = require('../config/config');
var router = express.Router();
const db = require('../helpers/db');
const checkAuth = require('../middleware/check-auth');

// Create a Supplier

    router.post('/createSupplier',(req,res)=>{
        const {supplierName} = req.body.supplierDetails;
        
        const {streetAddress} = req.body.supplierDetails;
        const {city} = req.body.supplierDetails;
        const {Province} = req.body.supplierDetails;
        const {country} = req.body.supplierDetails;
        const {postalCode} = req.body.supplierDetails;
       
        const {phone} = req.body.supplierDetails;
        const {email} = req.body.supplierDetails;
        const {openBalance}= req.body.supplierDetails;
        const {supplierNumber} = req.body.supplierDetails;
        const {currency} = req.body.supplierDetails;
        const {currencyValue} = req.body.supplierDetails;
        const {qbId} =req.body.supplierDetails;

        db.query("INSERT INTO vendors (name,supplierNumber,streetAddress,city,Province,Country,postalCode,phone,email,openBalance,currency,currencyValue,qbId,provinceCode) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[supplierName,streetAddress,city,Province,country,postalCode,taxSlip,phone,email,openBalance,supplierNumber,currency],(err,result)=>{
            if(err)
                {
                    throw err;
                }
            res.status(201).send({message:'Supplier Successfull Created'});
        })
    });

    // Edit or Update a Supplier

    // router.post("/editSupplier/:id",(req,res)=>{
    //     const {supplierName} = req.body.supplierDetails;
    //     const {company} = req.body.supplierDetails;
    //     const {streetAddress} = req.body.supplierDetails;
    //     const {city} = req.body.supplierDetails;
    //     const {Province} = req.body.supplierDetails;
    //     const {country} = req.body.supplierDetails;
    //     const {postalCode} = req.body.supplierDetails;
    //     const {taxSlip} = req.body.supplierDetails;
    //     const {phone} = req.body.supplierDetails;
    //     const {email} = req.body.supplierDetails;
    //     const {openBalance}= req.body.supplierDetails;
    //     const {supplierNumber} = req.body.supplierDetails;
    //     const {currency} = req.body.supplierDetails;

    //     db.query("UPDATE suppliertable SET supplier=?,company=?,streetAddress=?,city=?,Province=?,Country=?,postalCode=?,taxSlip=?,phone=?,email=?,openBalance=?,supplierNumber=?,currency=? WHERE id=?",[supplierName,company,streetAddress,city,Province,country,postalCode,taxSlip,phone,email,openBalance,supplierNumber,currency,req.params.id],(err,result)=>{

    //         if(err)
    //         {
    //             throw err;
    //         }
    //         else
    //         {
    //             res.status(201).send({message:'Supplier Successfull Updated'});
    //         }
    //     });


    // });

// Get all Suppliers

router.get('/allSuppliers/:curr_page/:curr_count',async (req,res)=>{
    try{
    const total_count_array = await db.runQuery(`SELECT COUNT(*) AS total_records FROM vendors`);

    let cur_records = await db.runQuery(`SELECT * FROM vendors LIMIT ${req.params.curr_page * 10},${req.params.curr_count}`);

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
            db.query(`SELECT id,name,supplierNumber,qbId,poCount FROM vendors WHERE supplierNumber !=' '`,(err,result)=>{
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

// Get all the Accounts Data from Database

    router.get('/getAllAccounts',async (req,res)=>{

        try{
        db.query('SELECT * FROM qbaccounts',(err,result)=>{
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
            res.status(500).send({success:false,data:[],error:e});
        }
    });

// Search a Supplier
    router.post('/searchSupplier/:curr_page/:curr_count',async(req,res)=>
    {
        try{
    const {supplierName} = req.body;   
    const total_count_array =  await db.runQuery(`SELECT COUNT(*) AS total_records FROM vendors WHERE name LIKE '%${supplierName}%'`);
    let cur_records = await db.runQuery(`SELECT * FROM vendors WHERE name LIKE '%${supplierName}%' LIMIT ${req.params.curr_page * 10},${req.params.curr_count}`);
    let result ={
        total_count:total_count_array[0].total_records,
        cur_records:cur_records,
        message:"Success"
  };
  res.status(201).send({message:"Successfull",data:result});
        }
        catch(e)
        {
            res.status(500).send({success:false,data:[],error:e});
        }
});


module.exports = router;