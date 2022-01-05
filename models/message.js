
let connection = require('../config/db')

class Message {


    static create(content, cb) {

        connection.query('INSERT INTO messages SET content = ?, create_at = ?', [content, new Date()], (error, result) => {
            if (error) throw error;
            cb(result)
        })
    }

    static all(cb) {
        connection.query('SELECT * FROM messages', (error, rows) => {
            if(error) throw error
            cb(rows)
        })

    }
}

module.exports = Message
