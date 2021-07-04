const express = require("express")
const bodyParser = require("body-parser")
const mongoose= require("mongoose")
const path = require ("path")

require("dotenv").config()

const Routes = require("./routes/routes")
const app = express()


app.use(bodyParser.json())
app.use(express.static(path.join("public")))
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Methods",'GET, POST, PATCH, DELETE')
    next()
});
app.use("/api",Routes)
app.use((req,res,next)=>{
    res.sendFile(path.resolve(__dirname,'public',"index.html"))
})
app.use((err,req,res,next)=>{
    if(res.headerSent){
        return next(err)
    }
    res.status(500).json({
        error:err,
        message:"Unknown Error Occurred"
    })
})
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cnm4a.mongodb.net/Event?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    
    app.listen(process.env.PORT ||  5000,()=>console.log("Console Working"))
}).catch(err=>{
    console.log(err);
})