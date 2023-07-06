const mongoose = require('mongoose')
const schema = mongoose.Schema

const taskschema = new schema({
    task:{
        type:String,
        required:true
    },
    starttime:{
        type:Number,
        required:true
    },
    deadline:{
        type:Number,
        required:true
    },
    completiontime:{
        type:Number
    },
    iscomplete:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Task', taskschema)