const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const session = require('express-session')
const port = 3000

// Moteur de template
app.set('view engine', 'ejs')

// Middleware
app.use('/assets', express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//app.use(express.json())
//app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'azazaze',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


// Route
app.get('/', (req, res) => {
    // Récupérer les infos stocker dans la session
    // console.log(req.session.error)
    if(req.session.error) {
        res.locals.error = req.session.error
        req.session.error = undefined
    }
    res.render('pages/index')
})

app.post('/', (req, res) => {
    if(req.body.message === undefined || req.body.message === '') {
        //res.render('pages/index', {error: 'Vous n\'avez pas entré de message :('})
        req.session.error = 'Il y a une erreur'
        res.redirect('/')
    }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))