const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    description :{
        type:String,
        required: true
    },
    start:{
        type:Date,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    end:{
        type:Date,
        require:true
    }
})

module.exports = mongoose.model("Event",eventSchema)