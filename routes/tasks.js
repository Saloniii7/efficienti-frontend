const express=require('express')
const router=express.Router()
const { isloggedin } = require('../middleware')
const Task=require('../models/tasks')


router.get('/tasks',isloggedin,(req,res)=>{
    res.render('taskscheduler')
})
router.post('/tasks',isloggedin,async(req,res)=>{
    try{
        const newtask=new Task(req.body);
        await newtask.save();
        req.user.tasks.push(newtask._id);
        await req.user.save();
        req.flash('success','Successfully added Task!')
        res.redirect('/tasks');
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/tasks');
    }
    

})

module.exports=router