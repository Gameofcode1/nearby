const express=require('express')
const userroute=require('./router/user')
require('./db/db')

const port=process.env.PORT
const app=express()
app.use(express.json())

app.use(userroute)


app.listen(port)


