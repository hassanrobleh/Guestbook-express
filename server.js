import express from 'express'

import session from 'express-session'
import { flash } from './middleware/flash.js'
import Message from './models/message.js'
import message from "./models/message.js";

const port = 3000

const app = express()

// Moteur de template
app.set('view engine', 'ejs')

// Middleware
app.use('/assets', express.static('public'))
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({extended: true}))
//app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'azazaze',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(flash)


// Route
app.get('/', (req, res) => {
    // Récupérer les infos stocker dans la session
    // console.log(req.session.error)
    // if(req.session.error) {
    //     res.locals.error = req.session.error
    //     req.session.error = undefined
    // }
    //console.log(req.session)


    Message.all((messages) => {
        res.render('pages/index', {messages: messages})
    })

    //res.render('pages/index')
})

app.post('/', (req, res) => {
    if(req.body.message === undefined || req.body.message === '') {
        //res.render('pages/index', {error: 'Vous n\'avez pas entré de message :('})
        //req.session.error = 'Il y a une erreur'
            req.flash('error', 'Vous n\'avez pas posté de message')
        res.redirect('/')
    } else {
        //const Message = require('./models/message')
         Message.create(req.body.message, () => {
             req.flash('success', 'Merci !')
             res.redirect('/')
         })

    }
})

app.get('/message/:id', (req, res) => {
    const id = req.params.id
    Message.find(id, (message) => {
        res.render('pages/show', {message: message})
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))