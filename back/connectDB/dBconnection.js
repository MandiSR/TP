const mysql= require('mysql2')

const dbConfig={
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'amanda',
    database: 'tp-final-uade'
}

const connection =mysql.createConnection(dbConfig)

connection.connect((err)=>{
    if(err){
        console.log("Failed to connect")
        return
    }
    console.log("Connection established")
})

module.exports =connection