const express = require('express');
const router  = express.Router();
const config = require('../config/config');
const OAuthClient =  require('intuit-oauth');

const quickBookLocalID = config.qb.quickBookLocalID
const quickBookUrl = 'http://localhost:4000';
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
                // await credentialsModel.updateTokenById(quickBookLocalID, oauth2_token_json, authResponse.getJson().id_token)
                console.log(authResponse.getJson())
                res.status(200).send({
                    data:oauth2_token_json,
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
module.exports = router;