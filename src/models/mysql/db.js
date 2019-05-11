'user strict';

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '192.168.1.52',
  user: 'ijtj03',
  password: '1234',
  database: 'comprassoa',
  port: 3306
});

connection.connect(() => {
  console.log("Conexion Ok")
});

module.exports = connection;
