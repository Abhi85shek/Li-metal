const express = require('express');
const { qb } = require('../config/config');
var router = express.Router();
const db = require('../helpers/db');
const checkAuth = require('../middleware/check-auth');



// router.use(checkAuth);
// Get All Product API

router.get("/allProducts/:curr_page/:curr_count",async (req,res)=>{

    try{

    let total_count_array = await db.runQuery(`SELECT COUNT(*) AS total_records FROM allservices`);

    let cur_records = await db.runQuery(`SELECT * FROM allservices LIMIT ${req.params.curr_page * 10},${req.params.curr_count}`);

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

// API for 
// Get All Product API WHICH ARE CURRENTLY ACTIVE

router.get('/allProductsActive',(req,res)=>{
    try{
    db.query("SELECT * FROM allservices WHERE active=?",[1],(err,result)=>{
        if(err)
            {
                throw err;
            }
            res.send(result);

    });
    }
    catch(e)
    {
        res.status(500).send({success:false,data:[],error:e});
    }
});

// CREATE Product API

router.post("/createProduct",(req,res)=>{    
    try{
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
        }
        catch(e)
        {
            res.status(500).send({success:false,data:[],error:e});
        }
});



// Archive Product API

router.post("/archiveProductById",(req,res)=>{

    try{
    const {id} =req.body;
    const {active} = req.body;
    
    db.query("UPDATE allservices SET active=? WHERE id=?",[active,id],(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json({message:"Product Archive Successfully"});
    });
}
catch(e)
{
    res.status(500).send({success:false,data:[],error:e});
}
});


 // API for searching a Product

    router.post("/searchOrder/:curr_page/:curr_count",async (req,res)=>{

        try{
        const {productName} = req.body;
        
        const total_count_array =  await db.runQuery(`SELECT COUNT(*) AS total_records FROM allservices WHERE serviceName LIKE '%${productName}%'`);

        let cur_records = await db.runQuery(`SELECT * FROM allservices WHERE serviceName LIKE '%${productName}%' LIMIT ${req.params.curr_page * 10},${req.params.curr_count}`);

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

// SORT Product By Type API

router.post("/filterServices/:curr_page/:curr_count",async (req,res)=>{

    try{
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
    }
    catch(e)
    {
        res.status(500).send({success:false,data:[],error:e});
    }
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

    try{
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
}
catch(e)
{
    res.status(500).send({success:false,data:[],error:e});
}
});

// Get The Tax Details 

router.get("/taxDetails",async(req,res)=>{

    try{
    db.query("SELECT * FROM qbtax",(err,result)=>{

        if(err)
        {
            throw err;
        }

        res.status(201).send({message:"Successfull",data:result});
    });
    }
    catch(e)
    {
        res.status(500).send({success:false,data:[],error:e});
    }
});

// GET all the Approvers

router.get('/getApprovers',(req,res)=>{
 
    try{
    db.query('SELECT * FROM limetalusers WHERE type=?',["approver"],(err,result)=>{

        if(err)
        {
          return res.status(500).json({success:false,message:err});
        }
        else{
          return res.status(201).send({success:true,data:result});
        }
    });
      }
      catch(e)
      {
        res.status(500).send({success:false,data:[],error:e});
      }

});


// Get all the Secondary Approvers 

    router.get("/getsecondaryapprovers", (req,res)=>{

        try{
        db.query('SELECT * FROM limetalusers WHERE type=? AND approverType = ?',["approver",1],(err,result)=>{

            if(err)
            {
              return res.status(500).json({success:false,message:err});
            }
            else{
              return res.status(201).send({success:true,data:result});
            }
        });
    }
    catch(e)
    {
        res.status(500).send({success:false,data:[],error:e});
    }
    });

    // Filter API for the Orders

    router.post("/filterorders/:curr_page/:curr_count",async (req,res)=>{
        try{
            const {filterId} = req.body;
            const total_count_array =  await db.runQuery(`SELECT COUNT(*) AS total_records FROM limetalorders WHERE overallStatus IN (${filterId})`);
            let cur_records = await db.runQuery(`SELECT * FROM limetalorders WHERE overallStatus IN (${filterId}) LIMIT ${req.params.curr_page * 10},${req.params.curr_count}`);
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


    // Total Order Placed Created

    router.get("/gettotalorders", async (req,res)=>{

        try{

            db.query("SELECT COUNT(*) as totalorders FROM limetalorders",(err,result)=>{
                if(err)
                {
                    return res.status(500).json({success:false,error:err});
                }
                
                return res.status(201).send({success:true,data:result});
            });

        }
        catch(e)
        {
            res.status(500).send({success:false,data:[],error:e});
        }
        
    });


    // Total Order Approved. 

    router.get("/getallapprovedpo",async (req,res)=>{

        try{

            db.query("SELECT COUNT(*) as totalApprovedPO FROM limetalorders WHERE overallStatus=?",[2],(err,result)=>{
                if(err)
                {
                    return res.status(500).json({success:false,error:err});
                }
                
                return res.status(201).send({success:true,data:result});
            });

        }
        catch(e)
        {
            res.status(500).send({success:false,data:[],error:e});
        }
    });


    // Total Approval Pending

    router.get("/getallpendingpo",async (req,res)=>{

        try{

            db.query("SELECT COUNT(*) as totalPendingPo FROM limetalorders WHERE overallStatus=?",[0],(err,result)=>{
                if(err)
                {
                    return res.status(500).json({success:false,error:err});
                }
                return res.status(201).send({success:true,data:result});
            });

        }
        catch(e)
        {
            res.status(500).send({success:false,data:[],error:e});
        }
    });

    // Total QB Created

    router.get("/getallqbcreated",async (req,res)=>{

        try{

            db.query("SELECT COUNT(*) as totalqbcreated FROM limetalorders WHERE overallStatus=?",[3],(err,result)=>{
                if(err)
                {
                    return res.status(500).json({success:false,error:err});
                }
                return res.status(201).send({success:true,data:result});
            });

        }
        catch(e)
        {
            res.status(500).send({success:false,data:[],error:e});
        }
    });

    // Get all the Products Count

    
    
    router.get("/getallproductcount",async (req,res)=>{

        try{

            db.query("SELECT COUNT(*) as totalproducts FROM allservices",(err,result)=>{
                if(err)
                {
                    return res.status(500).json({success:false,error:err});
                }
                return res.status(201).send({success:true,data:result});
            });

        }
        catch(e)
        {
            res.status(500).send({success:false,data:[],error:e});
        }
    });

    // Create Items in local Database

    router.post("/createlocalItem",async (req,res)=>{

        const {serviceName} = req.body;
        const {description} = req.body;
        const {type} = req.body;
        const {qbId} = req.body;

        qb.query("INSERT INTO allservices (serviceName,description,type,qbId) VALUES (?,?,?,?)",[serviceName,description,type,qbId],(err,result)=>{

            if(err)
                {
                    return res.status(500).json({success:false,error:err});
                }
                else
                {
                    return res.status(201).json({success:true,message:"Item Successfully Created Locally"});
                }
        });
    });

module.exports = router;