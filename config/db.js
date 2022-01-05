
//require('babel-register')
import mysql from 'mysql';

const connection = mysql.createConnection({
    host     : 'localhost',
    database : 'livredor',
    user     : 'root',
    password : '1234',

})

connection.connect((err) => {
    if(err) {
        console.log(err.message)
    } else {
        console.log('Connected !')
    }
})

export default connection
