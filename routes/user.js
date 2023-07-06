const express=require('express')
const router=express.Router()
const passport=require('passport')
const user = require('../models/users')

router.get('/register',(req,res)=>{
    res.render('register')
})
router.post('/register',async(req,res)=>{
    try {
        const { email, username, password,phoneno,gender,address,about } = req.body
        const use = new user({ email, username,phoneno,address,gender,about })
        const reguser = await user.register(use, password)
        req.login(reguser, err => {
            if (err) { return next(err) }
            req.flash('success', 'Welcome to Efficienti!')
            res.redirect('/home')
        })

    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
        console.log(e)
    }
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }),(req,res)=>{
    req.flash('success', 'Welcome back!')
    const redirecturl = req.session.returnto || '/home'
    delete req.session.returnto;
    res.redirect(redirecturl)
})
router.get('/logout',async(req,res,next)=>{
    req.logout(function (err) {
        if (err) { return next(err); }

        res.redirect('/');
    });
})


module.exports = router