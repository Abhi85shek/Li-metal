const express = require('express');
var router = express.Router();
var db = require("../helpers/db");
const checkAuth = require('../middleware/check-auth');


router.use(checkAuth);
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


// Store the PO locally

router.post("/storelocal", async (req,res)=>{

    // const {APAccountRef}  = req.body.orderObj;
    // console.log(req.body.orderObj.APAccountRef.name);

    const apName = req.body.orderObj.APAccountRef.name
    const apValue = req.body.orderObj.APAccountRef.name
    const {DocNumber} =req.body.orderObj;
    const {Line} =req.body.orderObj;
    const {shipTo} =req.body.orderObj;
    const {creationDate} =req.body.orderObj;
    const shipName = req.body.orderObj.ShipTo.name;
    const shipValue = req.body.orderObj.ShipTo.value;
    const {TotalAmt} = req.body.orderObj;
    const {VendorRef} = req.body.orderObj;
    const {primaryApprover} = req.body.orderObj;
    const {secondaryApprover} = req.body.orderObj;
    const {customerName} = req.body.orderObj;
    const {supplierName} = req.body.orderObj;

    // const {totalApprovers} = req.body.orderObj;  

    db.query("INSERT INTO limetalorders (supplierName,customerName,totalAmount,docNumber,detailType,line,apAccountRefname,apAccountRefvalue,vendorRefname,vendorRefValue,shipToName,shipToValue,primaryApprover,secondaryApprover,primaryApproved,secondaryApproved,overallStatus,creationDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [supplierName,customerName,TotalAmt,DocNumber,"ItemBasedExpenseLineDetail",JSON.stringify(Line),apName,apValue,VendorRef.name,VendorRef.value,shipName,shipValue,primaryApprover,secondaryApprover,0,0,0,creationDate],(err,result)=>{
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


router.get("/getallPo",(req,res)=>{

    db.query("SELECT * FROM limetalorders",(err,result)=>{

        if(err)
            {
                return res.status(500).json({success:false,error:err});
            }
            else
            {
                res.status(200).send({success:true,data:result});
            }
    });
});

router.post("/getAllApproversPo",(req,res)=>{

    const {primaryApproversId} = req.body;
    db.query("SELECT * FROM limetalorders WHERE primaryApprover = ? UNION SELECT * FROM limetal_dev.limetalorders WHERE secondaryApprover=? AND overallStatus IN ('1','2')",[primaryApproversId,primaryApproversId],(err,result)=>{

        if(err)
            {
                res.status(500).json({success:false,error:err});
            }
            else
            {
                res.status(200).send({success:true,data:result});
            }
    });

});


// Approvers Change the Status of PO

router.post("/approvepo",(req,res)=>{

    // const {approversId} = req.body;
    const {poId} = req.body;
    db.query("SELECT primaryApprover,secondaryApprover,overallStatus FROM limetalorders WHERE id=?",[poId],(err,result)=>{
        if(err)
        {
           return res.status(500).json({success:false,error:err});
        }
        else
        {
            if(result[0].primaryApprover!=0 && result[0].secondaryApprover==0)
                {
                    db.query('UPDATE limetalorders SET overallStatus=? WHERE id=?',[2,poId],(err,result)=>{
                        if(err)
                        {
                        return res.status(500).json({success:false,error:err});
                        }
                        else
                        {
                        return res.status(200).send({success:true,message:result});
                        }
                 });
            }
                else if(result[0].primaryApprover!= 0 && result[0].secondaryApprover!=0 && result[0].overallStatus == 0)
                {
                    db.query("UPDATE limetalorders SET overallStatus=? WHERE id=?",[1,poId],(err,result)=>{
                        if(err)
                        {
                        return res.status(500).json({success:false,error:err});
                        }
                        else
                        {
                        return res.status(200).send({success:true,message:result});
                        }
                    });
                }
                else if(result[0].primaryApprover!=0 && result[0].secondaryApprover!= 0 && result[0].overallStatus ==1)
                {
                    db.query("UPDATE limetalorders SET overallStatus=? WHERE id=?",[2,poId],(err,result)=>{
                        if(err)
                        {
                        return res.status(500).json({success:false,error:err});
                        }
                        else
                        {
                        return res.status(200).send({success:true,message:result});
                        }
                    });
                }
                else
                {
                    return res.status(404).json({success:false,message:"No PO Found"})
                }
        }
    })

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