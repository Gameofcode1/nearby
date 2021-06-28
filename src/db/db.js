const mongoose=require('mongoose')


mongoose.connect(process.env.MONGOB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
})
