const express = require('express');
const router  = express.Router();
const config = require('../config/config');
const axios = require('axios');
const vendor =require('../helpers/vendors');
const OAuthClient =  require('intuit-oauth');
const Customer = require('../helpers/customer');
const account = require('../helpers/accounts');
const db =require("../helpers/db");
const { route } = require('./poGenerate');

const quickBookLocalID = config.qb.quickBookLocalID
const quickBookUrl = 'http://localhost:3001/home';
const QUICK_BOOK_PROD_URL = 'https://quickbooks.api.intuit.com';

const QUICK_BOOK_BASE_URL = config.qb.BASE_URL;

const QUICK_BOOK_COMPANY_NUMBER = config.qb.COMPANY_NUMBER;
console.log(QUICK_BOOK_COMPANY_NUMBER);
console.log(QUICK_BOOK_BASE_URL);

var oauthClient = new OAuthClient({
    clientId: 'ABcuA9eU874j0XBEEikAj9AkCvnKKmTziYwo5dcrJp54VasODZ',     // enter the apps `clientId`
    clientSecret: 'ExRpxe2thNamDU5LqB1QXcLVlX7kCaLz8pKHEsvL',           // enter the apps `clientSecret`
    environment:'sandbox',          // enter either `sandbox` or `production`
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
                obj.currencyName = item.CurrencyRef.value
                
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
            };
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

    // require.use(checkAuth);
    // Create PO Number API

    router.post('/createPO',async (req,res)=>{
        // console.log("Hello")
        let finalCount;
        
        const {TotalAmt} = req.body.data;
        console.log(req.body.data);
        const {poId} = req.body; 
        const {refreshToken} = req.body;
                        // console.log(refreshToken);
        const headers = {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                    'Authorization': "Bearer " + refreshToken
        };
        const {vendorId} =req.body;
        db.query("SELECT poCount FROM vendors WHERE id=?",[vendorId], async (err,result)=>{

            if(err)
                {
                    return res.status(500).json({success:false,error:err});
                }
            if(result.length >0)
                {
                    finalCount = result[0].poCount +1;
                    
                    try{
                        
                        const data = req.body['data'];
                        let {DocNumber} =  data;
                        DocNumber = DocNumber + '-' + finalCount;
                        
                        console.log(TotalAmt);
                        // console.log()
                        const {Line} = data;
                        console.log(Line[0].ItemBasedExpenseLineDetail);
                        console.log(Line[0].ItemBasedExpenseLineDetail);
                        const {APAccountRef} = data;
                        const {VendorRef} = data;
                        const {ShipTo} = data;
                        console.log(TotalAmt);
                        let finalLine =[];
                        for(let i=0 ;i<Line.length;i++)
                            {
                                finalLine.push({
                                    "DetailType": "ItemBasedExpenseLineDetail",
                                    "Amount": Line[i].Amount, 
                                    "Id": Line[i].Id, 
                                    "Description": Line[i].Description,
                                    "LineNum": Line[i].LineNum,
                                    "ItemBasedExpenseLineDetail":{
                                    "ItemRef": {
                                        "name": Line[i].ItemBasedExpenseLineDetail.ItemRef.name, 
                                        "value": Line[i].ItemBasedExpenseLineDetail.ItemRef.value
                                      },
                                      "Qty": Line[i].ItemBasedExpenseLineDetail.Qty, 
                                      "TaxCodeRef": {
                                        "value": "NON"
                                      }, 
                                      "BillableStatus": "NotBillable",
                                      "UnitPrice": Line[i].ItemBasedExpenseLineDetail.UnitPrice
                                    }
                                })
                            }
                        
                        let purchaseOrderBody = 
                            {
                                "TotalAmt": TotalAmt, 
                                "DocNumber": DocNumber,
                                "Line": finalLine, 
                                "APAccountRef": {
                                  "name": APAccountRef.name, 
                                  "value": APAccountRef.value
                                }, 
                                "VendorRef": {
                                  "name": VendorRef.name, 
                                  "value": VendorRef.value
                                },
                                "ShipTo": {
                                  "name": ShipTo.name, 
                                  "value": ShipTo.value
                                }
                            };
                            // console.log(purchaseOrderBody);
                            // Line.forEach((list)=>{
                            //     purchaseOrderBody.Line.push(list);
                            //     console.log(list);
                            // })
                            // console.log(ge)
                        console.log(purchaseOrderBody);
                        const createInvoiceUrl = `${QUICK_BOOK_BASE_URL}/v3/company/${QUICK_BOOK_COMPANY_NUMBER}/purchaseorder?minorversion=40`;
                        console.log(createInvoiceUrl);
                        const response = await axios.post(createInvoiceUrl,purchaseOrderBody,{headers}); 
                        console.log(response);
                        if(response.status == 200)
                        {
                                db.query("UPDATE limetalorders SET overallStatus =?,docNumber=? WHERE id=?",[3,DocNumber,poId],(err,result)=>{
                                    if(err)
                                        {
                                        return res.json({success:false,message:err});
                                        }                               
                                 });
        
                                    db.query("UPDATE vendors SET poCount=? WHERE id=?",[finalCount,vendorId],(err,result)=>{

                                    if(err)
                                    {
                                        return res.status(404).json({success:false,error:err});
                                    }
                                    
                                 });

                                 return  res.status(201).send({message:"PO created Successfully"});
   
                        }
                                }
                                catch(e)
                                {
                                    res.status(404).send({
                                        message:e.message,
                                        data:{e}
                                    });
                                }

                
                }
                
        });

      
    });


    // Delete Purchase ORder From QuickBooks

    router.get('/deletePO',async (req,res)=>{

        try {
            const {refreshToken} = req.body;
            const headers = {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'Authorization': "Bearer " + refreshToken
            };
        }
        catch(e)
        {

        }
    });

    // Get All the Vendors Details from QuickBooks

    router.get('/getAllVendors',async (req,res)=>{

        try{
            const {refreshToken} = req.body;
            const headers = {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'Authorization': "Bearer " + refreshToken
            };

            const vendorQuery =`select * from vendor`;
            const getAllVendorsURL = `${QUICK_BOOK_BASE_URL}/v3/company/193514828133914/query?query=${vendorQuery}&minorversion=65`;
            const response = await axios.get(getAllVendorsURL,{headers});
            if(response.status == 200)
            {
                res.send({message:'successfull',data:response.data});
            }
            else
            {
                res.status(401).send({message:"Data Not Found"});
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

    // API to create Items in QuickBooks
    router.post('/createItem',async(req,res)=>{

        try{
            const {refreshToken} = req.body;
            const {productName}  = req.body.productDetails;
            const {productDescription} = req.body.productDetails;
            const {type} = req.body.productDetails;
            const {unitCost}  =req.body.productDetails;
            const headers = {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'Authorization': "Bearer " + refreshToken
            };
            // Working
            const createItemBody = {
                "Name": productName,
                "PurchaseCost":parseInt(unitCost),
                "Description":productDescription,
                "IncomeAccountRef":{
                  "name": "Sales of Product Income", 
                  "value": "79"
                },
                "Type": "NonInventory", 
                "ExpenseAccountRef": {
                  "name": "Cost of Goods Sold", 
                  "value": "80"
                }
              };
            const createItemURL = `${QUICK_BOOK_BASE_URL}/v3/company/${QUICK_BOOK_COMPANY_NUMBER}/item?minorversion=65`;
            const response = await axios.post(createItemURL,createItemBody,{headers});
            if(response.status == 200)
            {
             
                const qbId = response.data.Item.Id;
                db.query("INSERT INTO allservices (serviceName,description,type,active,qbId) VALUE (?,?,?,?,?)",[productName,productDescription,type,1,qbId],(err,result)=>{

                    if(err)
                        {
                            res.status(500).send({error:err,sucess:false});
                        }

                        res.send({message:'successfull',data:response.data});
                }); 
                
              
            }
            else
            {
                res.status(401).send({message:"Data Not Found"});
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

    // API to create Vendors in Quickbooks

    router.post('/createVendor',async (req,res)=>{
    try{    
        
        const {refreshToken} = req.body;
        const {accountNumber} = req.body.vendorDetails;
        const {addressLineOne} = req.body.vendorDetails;
        const {addressLineTwo} = req.body.vendorDetails;
        const {addressLineThree} = req.body.vendorDetails;
        const {supplierNumber} =req.body.vendorDetails;
        const {country} = req.body.vendorDetails;
        const {city} = req.body.vendorDetails;
        const {CompanyName}  =req.body.vendorDetails;
        const {email} = req.body.vendorDetails;
        const {FamilyName} = req.body.vendorDetails;
        const {phone} = req.body.vendorDetails;
        const {postalCode} = req.body.vendorDetails;
        const {countrySubDivisionCode} = req.body.vendorDetails;
        // const {province} = req.body.vendorDetails;
        // working on CHanges
        // WOkring on CHangees
        const {TaxIdentifier} = req.body.vendorDetails;
        const {vendorName} = req.body.vendorDetails;
        console.log(accountNumber);
        const headers = {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'Authorization': "Bearer " + refreshToken
        };
        const createBodyVendor = 
        {
            "PrimaryEmailAddr": {
              "Address": email
            },
            "WebAddr": {
                "URI": "http://DiannesAutoShop.com"
            },
            "PrimaryPhone": {
              "FreeFormNumber": phone
            },
            "DisplayName": vendorName, 
            // "Suffix": "Sr.", 
            // "Title": "Ms.", 
            // "Mobile": {
            //   "FreeFormNumber": "(650) 555-2000"
            // }, 
            "FamilyName": FamilyName, 
            "TaxIdentifier": TaxIdentifier, 
            "AcctNum": accountNumber, 
            "CompanyName": CompanyName, 
            "BillAddr": {
              "City": city, 
              "Country": country, 
              "Line3": addressLineThree, 
              "Line2": addressLineTwo, 
              "Line1": addressLineOne, 
              "PostalCode": postalCode, 
              "CountrySubDivisionCode": countrySubDivisionCode
            }, 
            "GivenName": vendorName, 
            "PrintOnCheckName": CompanyName
        };
        const createVendorUrl = `${QUICK_BOOK_BASE_URL}/v3/company/${QUICK_BOOK_COMPANY_NUMBER}/vendor?minorversion=40`;
        const response = await axios.post(createVendorUrl,createBodyVendor,{headers});
        if(response.status == 200)
        {
            console.log(response.data);
            const address = response.data.Vendor.BillAddr.Line1 + response.data.Vendor.BillAddr.Line2 + response.data.Vendor.BillAddr.Line3;
            const openBalance = response.data.Vendor.Balance;
            const currencyName = response.data.Vendor.CurrencyRef.name;
            const currencyValue = response.data.Vendor.CurrencyRef.value;
            const qbId = response.data.Vendor.Id;
             db.query("INSERT INTO vendors (name,supplierNumber,streetAddress,city,country,postalCode,currency,currencyValue,qbId,phone,email,openBalance,poCount) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",[vendorName,supplierNumber,address,city,country,postalCode,currencyName,currencyValue,qbId,phone,email,openBalance,0],(err,result)=>{

                if(err)
                {
                    throw err;
                }
                if(result)
                    {
                        return res.send({message:'Vendor Successfull Created',data:response.data});
                    }

            });

          
            
        }
        else
        {
            res.status(401).send({message:"Data Not Found"});
        }
    }
    catch(e)
    {
        res.status(404).send({
            message:"Vendor with same name already Exists",
            data:{e}
        });
    }


    });


    // Get all the Accounts from Database 

    router.get("/getAllAccounts",async (req,res)=>{

        db.query("SELECT * FROM qbaccounts",(err,result)=>{

            if(err)
            {
                throw err;
            }
            else
            {
                res.send({message:"Successfull",data:result})
            }
        });
    });

    router.get("/insertAccounts",async (req,res)=>{
        for(let acc of account)
            {
                let name=acc.Name?acc.Name:" ";
                let classification = acc.Classification? acc.Classification : " ";
                let accountType = acc.AccountType ? acc.AccountType : " " ;
                let accountSubType = acc.AccountSubType ? acc.AccountSubType : " ";
                let accountNumber = acc.AcctNum? acc.AcctNum:" ";
                let currencyValue = acc.CurrencyRef ? acc.CurrencyRef.value : " ";
                let qbId = acc.Id;  
                db.query("INSERT INTO qbaccounts (name,classification,accountType,accountSubType,accountNumber,currency,qbId) VALUES (?,?,?,?,?,?,?)",
                [name,classification,accountType,accountSubType,accountNumber,currencyValue,qbId],(err,result)=>{
                            if(err)
                            {
                                throw err;
                            }
                });
            }
    });

    // Insert Quickbooks Customer in Database

    router.get("/insertCustomer",async (req,res)=>{
        for (let cust of Customer)
            {
                let name = cust.DisplayName ? cust.DisplayName : " ";
                let currencyValue = cust.CurrencyRef ? cust.CurrencyRef.value : " ";
                let qbId = cust.Id;
                db.query("INSERT INTO customers (name,qbId,currencyValue) VALUES (?,?,?)",
                [name,qbId,currencyValue],(err,result)=>{
                            if(err)
                            {
                                throw err;
                            }
                });
            }
    });


    router.get("/insertVendors",async (req,res)=>{
        for(let vend of vendor)
            {
               
                let name=vend.DisplayName?vend.DisplayName:" ";
                let streetAddress = vend.BillAddr? vend.BillAddr.Line1 + ' ' + vend.BillAddr.Line2 :" ";
                let city = vend.BillAddr ? vend.BillAddr.City : " " ;
                let country = vend.BillAddr ? vend.BillAddr.Country : " ";
                let currency = vend.CurrencyRef ? vend.CurrencyRef.name:  " ";
                let currencyValue = vend.CurrencyRef ? vend.CurrencyRef.value : " ";
                let postalCode = vend.BillAddr? vend.BillAddr.PostalCode : " ";
                let provinceCode = vend.BillAddr ? vend.BillAddr.CountrySubDivisionCode : " ";
                let balance = vend.Balance ? vend.Balance: " ";
                let qbId = vend.Id;
                
                db.query("INSERT INTO vendors (name,streetAddress,city,country,postalCode,currency,currencyValue,qbId,phone,email,supplierNumber,openBalance,province,provinceCode) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [name,streetAddress,city,country,postalCode,currency,currencyValue,qbId," "," "," ",balance," ",provinceCode],(err,result)=>{

                            if(err)
                            {
                                throw err;
                            }
                });
            }
    });

    // Get all the Customer From dataBase
    router.get("/getAllCustomer",async (req,res)=>{

        db.query("SELECT * FROM customers",(err,result)=>{
    
            if(err)
            {
                throw err;
            }else
            {
                res.send({message:"Successfull",data:result});
            }
    
        });
    });

    // Get the total Number of Products from the Quickbook

    router.get("/getproductcountfromquickbooks",async (req,res)=>{
        try{
            const {refreshToken} = req.body;
            const headers = {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'Authorization': "Bearer " + refreshToken
            };

            const itemQuery =`select COUNT(*) from Item`;
            const getitemCountURL = `${QUICK_BOOK_BASE_URL}/v3/company/${COMPANY_NUMBER}/query?query=${itemQuery}&minorversion=65`;
            const response = await axios.get(getitemCountURL,{headers});
            if(response.status == 200)
            {
                res.send({message:'successfull',data:response.data});
            }
            else
            {
                res.status(401).send({message:"Data Not Found"});
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