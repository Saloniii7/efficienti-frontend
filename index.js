const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const path = require('path')
const ejsmate = require('ejs-mate')
const methodoverride = require('method-override')
app.engine('ejs', ejsmate)
const passport = require('passport')
const localstrategy = require('passport-local')
const user = require('./models/users')

const dburl = process.env.DB_url
mongoose.connect(dburl)
    .then(() => {
        console.log('connection secured')
    })
    .catch((err) => {
        console.log('errorr!')
        console.log(err)
    })


app.use(express.urlencoded({ extended: true }))
app.use(express.json())//to parse json application
app.use(methodoverride('_method'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

const session = require('express-session')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo');
const store = new MongoStore({
    mongoUrl: dburl,
    secret: 'thisshouldbeasecret',
    touchAfter: 24 * 60 * 60
})
store.on('error', (e) => {
    console.log('session store error', e)
})
const sessionconfig = {
    store,
    secret: 'thisshouldbeasecret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionconfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localstrategy(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

app.use((req, res, next) => {
    res.locals.curruser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

const mainroutes=require('./routes/main')
const userss=require('./routes/user')
const tsks=require('./routes/tasks')


app.use('/',mainroutes)
app.use('/',userss)
app.use('/',tsks)


app.get('/',(req,res)=>{
    res.render('landingpage')
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log('listening on port 8000')
})