const express=require('express');
const router=express.Router();
const User=require('../models/User');
const {body,validationResult}=require('express-validator');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSecret="somesecretmessage";


router.post('/createUser',[
    //validations using express-validator package
    body('email').isEmail(),
    body('name').isLength({min:5}),
    body('password',"password should be atleast 5 characters").isLength({min:5})],
     async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        
        //salt is for securing the password
        //here below line creates some random value of 10 chars
        const salt=await bcrypt.genSalt(10);
        //using bcrypt.js password is stored in hash code
        //we are a\concating both salt and bcrypt thing for even more security
        //secure password
        let secPassword =await bcrypt.hash(req.body.password,salt);

        try {
            await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:true});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})


router.post('/loginuser',[
body('email').isEmail(),
body('password').isLength({min:5})]
,async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    let email=req.body.email;
        try {
            let userData=await User.findOne({email});
            if(!userData){
                return res.status(400).json({errors:"Try logging with correct credentials"});
            }

            //password compare
            const pwdCompare=await bcrypt.compare(req.body.password,userData.password);
            if(!pwdCompare){
                return res.status(400).json({errors:"Try logging with correct credentials"});
            }

            const data={
                user:{
                    id:userData.id
                }
            }

            const authToken=jwt.sign(data,jwtSecret);

            return res.json({success:true,authToken:authToken});

        }        
     catch (error) {
        console.log(error);
        res.json({success:false});
    }
});



module.exports=router;