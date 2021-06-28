const Users = require('../modules/user')
const express = require('express')
const auth=require('../middleware/auth')


const router = new express.Router()

router.post("/users", async (req, res) => {
    const newuser = Users(req.body)
    try {
        const token = await newuser.generateAuthToken()
        res.status(201).send({ user: newuser, token })
        const user = await newuser.save()
        res.status(200).send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }

})


router.post("/users/login", async (req, res) => {
    console.log(req.body)
    try {
        const newuser = await Users.findByCredentials(req.body.email, req.body.password)
        const token = await newuser.generateAuthToken()
        res.send({ user: user, token })
    }
    catch (e) {
        res.status(400).send(e)
    }

})


router.patch('/users/me',auth,async(req,res)=>{
    const data=['name','email','phonenumber','password']
    const requestdata=Object.keys(req.body)
    const validation =requestdata.every((items)=>data.includes(items))
    if(!validation){
        res.status(400).send("not allowed")
    }
    try{
        requestdata.forEach((items)=>req.user[items]=req.body[items])
        await req.user.save()
        res.status(200).send(req.user)
    }
    catch(e){
        res.status(400).send("error")

    }
})


router.get('/users/me',auth, async (req, res) => {
    try {
        const user = await Users.find()
        res.status(200).send(req.user)
    }
    catch (e) {
        res.status(500).send("error")
    }

})

router.delete('/users/me',auth,async (req,res)=>{

    try{
    await req.user.remove()
    res.status(200).send(req.user)
    }
    catch(e){
        res.status(400).send("error")

    }
})

router.get("/",(req,res)=>{
    res.status(200).send("Journey begains")
})



module.exports = router