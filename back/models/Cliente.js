const { DataTypes } = require("sequelize");
const { connection, sequelize } = require("../connectDB/dBconnection");

// Definir el modelo Producto
const Cliente = sequelize.define("Cliente", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  cuit: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
},
{
    freezeTableName: true
});

// Sincronizar el modelo con la base de datos
Cliente.sync({})
  .then(() => {
    console.log("Tabla de Cliente Creada");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = Cliente;
