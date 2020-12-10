const dotenv = require('dotenv').config();
const mysql = require('promise-mysql');


const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
})

module.exports = {
  pool
}