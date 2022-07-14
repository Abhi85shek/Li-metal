var express = require('express');
var router = express.Router();
const jwt =require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const hashing  = require('../helpers/bcrypt');
const bcrypt = require('bcrypt');

hashing("admin123");
router.post("/login",async (req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  db.query(`SELECT * FROM limetalusers WHERE email=?`,[email],async (err,result)=>{
      if(err)
      {
          res.status(404).send({
              message:"Query Not Working"
          });
      }
      if(result.length!=0)
      {
              const Passwordmatch = await bcrypt.compare(password,result[0].password);
              if(Passwordmatch)
              {

                  // creating a JWT Token and Send Email as a Payload

                  const token = jwt.sign({
                          email:result[0].email
                  },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
                  res.status(200).json({message:"Login Successful",userId:result[0].userid,userEmail:result[0].email,token,userType:result[0].userType,userValid:true,userName:result[0].fullName});
              }
              else
              {
                  res.json({message:"Please Check Your Password",userValid:false});
              }      
      }
      else
      {
                  res.json({message:"No User Found",userValid:false});
      } 
  })

});


router.use(checkAuth);
module.exports = router;
