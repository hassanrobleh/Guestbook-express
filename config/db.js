
require('babel-register')
const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    database : 'livredor',
    user     : 'root',
    password : '1234',

})

db.connect((err) => {
    if(err) {
        console.log(err.message)
    } else {
        console.log('Connected !')
    }
})

module.exports = db
