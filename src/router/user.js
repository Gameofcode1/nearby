const Users=require('../modules/user')
const express=require('express')


const router = new express.Router()

router.post("/users",async(req,res)=>{
    const newuser=Users(req.body)
    try{
        const token=await newuser.generateAuthToken()
        res.status(201).send({user:newuser,token})
        const user=await newuser.save()
       res.status(200).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }

})
router.post("/users/login",async(req,res)=>{
    console.log(req.body)
    try{
    const newuser=await Users.findByCredentials(req.body.email,req.body.password)
    const token=await newuser.generateAuthToken()
    res.send({user:user,token})
    }
    catch(e){
        res.status(400).send(e)
    }

})
router.get('/users',async(req,res)=>{
    try{
        const user=await Users.find()
        res.status(200).send(user)
        }
    catch(e){
        res.status(500).send("error")



    }


})

module.exports=router