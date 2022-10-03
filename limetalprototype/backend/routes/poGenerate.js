const express = require('express');
var router = express.Router();
var db = require("../helpers/db");

router.get("/getAllArea",(req,res)=>{

    db.query("SELECT * FROM areatable",(err,result)=>
    {
        if(err)
        {
            throw err;
        }
        
            res.send(result);
        
    });
});

router.get("/getCostCenter/:areaId",(req,res)=>{

        const areaId = req.params.areaId;
    db.query("SELECT * FROM costcentertable WHERE areaId=?",[areaId],(err,result)=>
    {
            if(err)
            {
                res.send(err);
            }
            else
            {
                res.send(result);
            }
    });
});

router.get("/getAreaOfWork/:costCenterId",(req,res)=>{

    const constCenterId = req.params.costCenterId;

    db.query("SELECT * FROM areaofworktable WHERE costCenterId=?",[constCenterId],(err,result)=>{

        if(err)
        {
            res.send(err)
        }
        else
        {
            res.send(result);
        }

    });
});

router.get("/getLocation",(req,res)=>{

    db.query("SELECT * FROM locationtable",(err,result)=>{
        if(err)
        {
            res.send(err);
        }
        else{
            res.send(result);
        }
    });
});


router.post("/storelocal", async (req,res)=>{

    db.query("INSERT INTO limetalorders (totalAmount,docNumber,detailType,line,apAccountRefname,apAccountRefvalue,vendorRefname,vendorRefValue,shipToName,shipToValue) VALUES (?,?,?,?,?,?,?,?,?,?)",[],(err,result)=>{

        if(err)
            {
               return res.status(500).json({success:false,error:err});
            }
        else
        {
            res.status(200).send({success:true,message:"Order Created Successfully"})
        }
    
    });
});



router.post("/generatePO",async (req,res)=>{
    const {areaId} =req.body;
    const {costCenterId} =req.body;
    const {areaOfWorkId} =req.body;
    const {locationId} =req.body;

    const costCenter = await db.runQuery(`SELECT costCenterCode FROM costcentertable WHERE id=${costCenterId}`);
    const areaOfWork = await db.runQuery(`SELECT areaOfWorkCode FROM areaofworktable WHERE id=${areaOfWorkId}`);

   
    // const data={
    //     areaCode:areaId,
    //     costCenter,
    //     areaOfWork,
    //     locationCode:locationId
    // };
   const PONumber = `0${areaId}-0${costCenter[0].costCenterCode}-0${areaOfWork[0].areaOfWorkCode}-0${locationId}`;
    res.json({PONumber});
});
module.exports = router;