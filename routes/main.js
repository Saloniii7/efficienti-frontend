const express=require('express')
const router=express.Router()
const { isloggedin } = require('../middleware')

router.get('/dashboard',isloggedin,(req,res)=>{
    res.render('profile')
})

router.get('/home',(req,res)=>{
    res.render('home')
})
router.get('/efficienti',isloggedin,(req,res)=>{
    res.render('inventefficienti')
})

router.get('/productivity',isloggedin,(req,res)=>{
    res.render('productivity')
})

module.exports = router