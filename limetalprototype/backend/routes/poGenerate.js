const express = require('express');
var router = express.Router();
var db = require("../helpers/db");

router.get("/getAllArea",(req,res)=>{

    db.query("SELECT * FROM areatable",(err,result)=>
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
module.exports = router;