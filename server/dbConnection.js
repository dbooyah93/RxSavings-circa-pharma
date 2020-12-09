const mysql = require('promise-mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'rxuser',
  password: 'rxuser',
  database: 'RxPharmas'
})

module.exports = {
  pool
}