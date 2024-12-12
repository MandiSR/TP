const { DataTypes } = require("sequelize");
const { connection, sequelize } = require("../connectDB/dBconnection");

// Definir el modelo Producto
const Proovedor = sequelize.define("Proovedor", {
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
Proovedor.sync({})
  .then(() => {
    console.log("Tabla de Proovedor Creada");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = Proovedor;
