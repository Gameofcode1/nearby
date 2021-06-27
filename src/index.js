const express=require('express')
const userroute=require('./router/user')
require('./db/db')


const app=express()
app.use(express.json())

app.use(userroute)


app.listen(3000)


