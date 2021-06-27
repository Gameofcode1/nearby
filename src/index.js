const express=require('express')
const mongoose=require('mongoose')
const validator=require('validator')


const app=express()
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/nearby', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
})


const UserSchema=mongoose.Schema({
    name:{
        type:String,
        maxlength:20,
        minlength:5,
        required:true,
        trim:true,
    },
    phonenumber:{
        type:Number,
        maxlength:10,
        minlength:10,
        required:true,

    },
    email:{
        type:String,
        minlength:5,
        require:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("enter  the email")
            }
        },
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }

    }

})
const Users=mongoose.model('Users',UserSchema)

app.post("/users",async(req,res)=>{
    const newuser=Users(req.body)
    try{
        const user=await newuser.save()
       res.status(200).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }

})
app.get("/",(req,res)=>
res.send("hii "))

app.listen(3000)


