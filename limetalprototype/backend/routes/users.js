var express = require('express');
var router = express.Router();
const jwt =require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const hashing  = require('../helpers/bcrypt');
const bcrypt = require('bcrypt');

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
                  // Working
                  const token = jwt.sign({
                          email:result[0].email
                  },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
                  res.status(200).json({message:"Login Successful",userEmail:result[0].email,userName:result[0].fullName,userId:result[0].id,token,userType:result[0].type,userValid:true});
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

    // Change the Password of User

    router.post("/changepassword",async (req,res)=>{

        const {userId} = req.body;
        const {password} = req.body;

        db.query("SELECT * FROM limetalusers WHERE id=?",[userId],async (err,result)=>{

            if(err)
                {
                    return res.status(500).json({success:false,Error:err})
                }
            if(result.length < 0)
                {
                    return res.status(404).json({success:false,message:"No User Found"});
                }
            else
            {

                const hashedPassword = await hashing(password);

                db.query("UPDATE limetalusers SET password=? WHERE id=?",[hashedPassword,userId],(err,result)=>{
                    if(err)
                        {
                            return res.status(500).json({success:false,Error:err});
                        }
                        if(result)
                        {
                            return res.status(201).json({success:true,message:"Pasword Changed Successfully"});
                        }
                });
                    
            }
            


        });

    });


    router.get("/test",async (req,res)=>{

        // const {userId} = req.body;

        db.query("SELECT * FROM limetaluses",(err,result)=>{

            if(err)
            {
                return res.status(404).send({data:[],error:err})
            }
            else
            {
                return res.status(200).send({data:result,message:"Successfully"});
            }
        });

    });

router.use(checkAuth);

module.exports = router;
