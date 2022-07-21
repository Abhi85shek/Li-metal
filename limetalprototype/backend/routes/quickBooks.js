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


router.get('/quickBookAuthorizationUrl',async (req, res) => {
    try{
            var authUri = oauthClient.authorizeUri({scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId],state:'testState'});  
            // console.log(authUri);
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


module.exports = router;