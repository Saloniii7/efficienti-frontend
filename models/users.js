const mongoose = require('mongoose')
const schema = mongoose.Schema
const passportlocalmongoose = require('passport-local-mongoose')

const userschema = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    about:{
        type:String,
        required:true
    },
    address: {
        type: String,
        required: true
    },
    gender:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true,
    },
    points:{
        type:Number,
        default:0
    },
    tasks:[
        {
            type:schema.Types.ObjectId,
            ref:'Task'
        }
    ]
})
userschema.plugin(passportlocalmongoose)

module.exports = mongoose.model('User', userschema)