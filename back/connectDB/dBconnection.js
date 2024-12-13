const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err.message);
    process.exit(1);
  }
  console.log('Connection to the database established');
});

module.exports = connection;


// const mysql = require('mysql2');


// const dbUrl = process.env.MYSQL_URL;

// // Si la URL de la base de datos no está definida, lanzamos un error.
// if (!dbUrl) {
//     console.error('La variable de entorno MYSQL_URL no está definida.');
//     process.exit(1);
// }


// const connection = mysql.createConnection(dbUrl);

// connection.connect((err) => {
//     if (err) {
//         console.log("Failed to connect", err);
//         return;
//     }
//     console.log("Connection established");
// });

// module.exports = connection;





// const mysql= require('mysql2')

// const dbConfig={
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: 'amanda',
//     database: 'tp-final-uade'
// }

// const connection =mysql.createConnection(dbConfig)

// connection.connect((err)=>{
//     if(err){
//         console.log("Failed to connect")
//         return
//     }
//     console.log("Connection established")
// })

// module.exports =connection