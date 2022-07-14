const jwt = require('jsonwebtoken');
require('dotenv');  
module.exports = (req,res,next)=>{
    try{
    const token = req.headers.authorization.split(" ")[1];
        if(!token){
            throw new Error("Invalid Token");
        }
    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    req.userData={userEmail:decodedToken.userEmail};
    next();
    }
    catch(err){
       return res.status(401).json(
           {
               message:"Authentication Failed"
           }
       )
    }

};
