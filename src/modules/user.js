const mongoose = require('mongoose')
const validator = require('validator')
const bycrypt = require('bcryptjs')
const jswt =require('jsonwebtoken')


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 20,
        minlength: 5,
        required: true,
        trim: true,
    },
    phonenumber: {
        type: Number,
        maxlength: 10,
        minlength: 10,
        required: true,

    },
    email: {
        type: String,
        minlength: 5,
        require: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("enter  the email")
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }

    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }
    ]
})

UserSchema.methods.toJSON =function(){
    const user=this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject

}

UserSchema.methods.generateAuthToken=async function(){
    const user=this
    const token=await jswt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens=user.tokens.concat({token});
    await user.save();
    return token;
}

UserSchema.statics.findByCredentials =async (email,password)=>{

       const user=await Users.findOne({email})
        if(!user){
            throw new Error("not found")
        }
        const ismatch=await bycrypt.compare(password,user.password)
        console.log(ismatch)
        if(!ismatch){
            throw new Error("not found")
        }
        console.log(user)
       return (user)
      
}

UserSchema.pre('save', async function (next) {
    user = this

    if (user.isModified('password')) {
        user.password = await bycrypt.hash(user.password, 8)

    }
    next()
})


const Users = mongoose.model('Users', UserSchema)

module.exports = Users
