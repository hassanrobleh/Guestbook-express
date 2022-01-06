
import connection from '../config/db.js'
import moment from 'moment';


class Message {

    constructor(row) {
        this.row = row
    }

    get id() {
        return this.row.id
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

    static find(id, cb) {
        connection.query('SELECT id FROM messages WHERE id = ? LIMIT 1', [id], (error, rows) => {
            if(error) throw error

            cb(new Message(rows[0]))
        })
    }
}

//module.exports = Message
export default Message

