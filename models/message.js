
let connection = require('../config/db')

const moment = require('moment');
//import moment from 'moment';
//moment().format();

class Message {

    constructor(row) {
        this.row = row
    }

    get content() {
        return this.row.content
    }

    get create_at() {
        return moment(this.row.create_at)
    }

    static create(content, cb) {

        connection.query('INSERT INTO messages SET content = ?, create_at = ?', [content, new Date()], (error, result) => {
            if (error) throw error;
            cb(result)
        })
    }

    static all(cb) {
        connection.query('SELECT * FROM messages', (error, rows) => {
            if(error) throw error
            cb(rows.map((row) => new Message(row)))
        })

    }
}

module.exports = Message
