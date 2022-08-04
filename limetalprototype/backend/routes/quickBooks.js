const express = require('express');
const router  = express.Router();
const config = require('../config/config');
const axios = require('axios');
const OAuthClient =  require('intuit-oauth');

const quickBookLocalID = config.qb.quickBookLocalID
const quickBookUrl = 'http://localhost:3001/home';
const QUICK_BOOK_BASE_URL = config.qb.BASE_URL;
const QUICK_BOOK_COMPANY_NUMBER = config.qb.COMPANY_NUMBER;

var oauthClient = new OAuthClient({
    clientId: 'ABuhc0GyN2M5zgQMceAgco4DihVQsbPWxMgxs8qlwsRksWjhcf',            // enter the apps `clientId`
    clientSecret: 'DeJTAtT8Hy26rR9krlUiBvH8qT4kXPFc1sbioG6B',  // enter the apps `clientSecret`
    environment:'sandbox',     // enter either `sandbox` or `production`
    redirectUri: quickBookUrl,      // enter the redirectUri
});

// Get of Code,RealmId and testState

router.get('/quickBookAuthorizationUrl',async (req, res) => {
    try{
            var authUri = oauthClient.authorizeUri({scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId],state:'testState'});  
            // console.log(authUri);
            // res.status(200).redirect(authUri);
            res.status(200).send({
                data:authUri
            })
    }catch (e) {
        res.status(404).send({
            message:e.message,
            data:{}
        });
    }
});

// Generation of Token using Code,State and realmId 

router.get('/quickBookToken/:code/:state/:realmId', async (req, res) => {
    // console.log(req.params.code)
    try{
            var parseRedirect = quickBookUrl +"?code=" +req.params.code + "&"+ "state=" +req.params.state + "&"+ "realmId=" + req.params.realmId;    
            // Exchange the auth code retrieved from the **req.url** on the redirectUri
           oauthClient.createToken(parseRedirect)
            .then(async function(authResponse) {
                oauth2_token_json = authResponse.getJson().access_token;
                auth2_refresh_token = authResponse.getJson().refresh_token;
                // await credentialsModel.updateTokenById(quickBookLocalID, oauth2_token_json, authResponse.getJson().id_token)
                console.log(authResponse.getJson())
                res.status(200).send({
                    data:oauth2_token_json,
                    refresh_token:auth2_refresh_token,
                    oauthTokenSecret: authResponse.getJson().id_token
                })
            })
            .catch(function(e) {
                res.status(404).send({
                  e
                })
            });

    }catch (e) {
        res.status(404).send({
            message:"e.message",
            data:{}
        });
    }
});

// Get the refresh Token

    router.get("/refreshToken",async (req,res)=>{

        try{
            oauthClient.refresh()
        .then(function(authResponse) {
            console.log('Tokens refreshed : ' + JSON.stringify(authResponse.json()));
            res.status(201).send( JSON.stringify(authResponse.json()));

        })
        .catch(function(e) {
            console.error("The error message is :"+e);
            console.error(e.intuit_tid);
        });
        }
        catch(err)
        {
            res.status(404).send({
                message:"Error",
                // data:{e}
            });
        }
        

    });


    // router.get('/refreshtoken',async(req,res)=>{

    //     const response = await axios.post('https://developer.api.intuit.com/oauth2/v1/tokens/bearer',)
    // });

// Get all PurchaseOrder from QuickBooks
router.post('/getAllPurchaseOrder',async (req,res)=>{

    try{
    const {refreshToken} = req.body;
    const headers = {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization': "Bearer " + refreshToken
    };
    
    const getAllPurchaseOrderURL = `${QUICK_BOOK_BASE_URL}/v3/company/${QUICK_BOOK_COMPANY_NUMBER}/query?query=select * from PurchaseOrder&minorversion=65`

    const response = await axios.get(getAllPurchaseOrderURL,{headers});
    if(response.status === 200)
        {
            let result = response.data.QueryResponse.PurchaseOrder;
            let purchaseOrderDetails=[];
            for(let item of result)
            {
                let obj={};
                obj.pOId= item.Id;
                obj.pONumber=item.DocNumber;
                obj.creationDate = item.TxnDate;
                obj.totalAmount = item.TotalAmt
                obj.vendorName = item.VendorRef.name;
                
                purchaseOrderDetails.push(obj);
            }

            res.status(200).send({
                message:"succesfully",
                data:purchaseOrderDetails
            });
        }
        else
        {
            res.status(401).send({
                message:"Don't have privilege",
                data: {}
            });
        }
    }
    catch(e)
    { 
        res.status(404).send({
            message:e.message,
            data:{e}
        });
    }
});

    // Get PurchaseOrder Deatials By ID

router.post('/getPurchaseOrderById',async(req,res)=>{

    try{
    const {POId} = req.body;
    const {refreshToken} = req.body;
    const headers = {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization': "Bearer " + refreshToken
    };
    
    const getPurchaseOrderByIdURL = `${QUICK_BOOK_BASE_URL}/v3/company/${QUICK_BOOK_COMPANY_NUMBER}/purchaseorder/${POId}?minorversion=65`;
    const response = await axios.get(getPurchaseOrderByIdURL,{headers});
    if(response.status === 200)
        {
            const purchaseorderData = {
                    POId:response.data.PurchaseOrder.Id,
                    PONumber:response.data.PurchaseOrder.DocNumber,
                    creationDate:response.data.PurchaseOrder.TxnDate,
                    currency: response.data.PurchaseOrder.CurrencyRef.value,
                    ShipmentAddress: response.data.PurchaseOrder.ShipAddr.Line1 + ' ' + response.data.PurchaseOrder.ShipAddr.Line2 + ' ' + response.data.PurchaseOrder.ShipAddr.Line3,
                    Vendor:response.data.PurchaseOrder.VendorRef,
                    POProducts:response.data.PurchaseOrder.Line,
                    TotalAmount:response.data.PurchaseOrder.TotalAmt
            };
            res.status(200).send({
                message:"succesfully",
                data:purchaseorderData
            });
        }
    else
    {
        res.status(401).send({
            message:"Don't have privilege",
            data: {}
        });
    }
    }
    catch(e)
    {
        res.status(404).send({
            message:e.message,
            data:{e}
        });
    }

});

//  Get Purchase Order as PDF

    router.post('/getPOpdf',async (req,res)=>{

            try{
                const {POId} = req.body;
                const {refreshToken} = req.body;
                const headers = {
                    'Content-Type': 'application/pdf',
                    'Authorization': "Bearer " + refreshToken
                };
                const getPurchaseOrderpdfByIdURL= `${QUICK_BOOK_BASE_URL}/v3/company/${QUICK_BOOK_COMPANY_NUMBER}/purchaseorder/${POId}/pdf?minorversion=65`;
                const response = await axios.get(getPurchaseOrderpdfByIdURL,{responseType: 'arraybuffer',responseEncoding:"binary"},{headers});
                console.log(response)
                if(response.status === 200)
                {
                    
                    let buff = new Buffer.from(response.data);
                    let base64data = buff.toString('base64');
                    res.status(200).send(base64data);
                }
            else
            {
                res.status(401).send({
                    message:"Don't have privilege",
                    data: {}
                });
            }
            }
            catch(e)
            {
                res.status(404).send({
                    message:e.message,
                    data:{e}
                });
            }
    });


    // Sent Purchase Order as an Email

    router.post('/sendPO',async (req,res)=>{

        try{            
            const {refreshToken} = req.body;
            const {pOId} = req.body;
            const {email} = req.body;

            const headers = {
                "headers": {
                'Accept' : 'application/json',
                'Authorization': "Bearer " + refreshToken,
                'Content-Type': 'application/octet-stream'
                }
            }
            const sendPOUrl = `${QUICK_BOOK_BASE_URL}/v3/company/${QUICK_BOOK_COMPANY_NUMBER}/purchaseorder/${pOId}/send?sendTo=${email}&minorversion=65`
            const response = await axios.post(sendPOUrl,{}, headers)
            if (response.status === 200){
                res.status(200).send({
                    message:"Successfully",
                    data: response.data
                });
            }

        }
        catch(e)
        {
            res.status(404).send({
                message:e.message,
                data:{e}
            });
        }

    });

module.exports = router;