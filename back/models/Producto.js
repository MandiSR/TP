const { DataTypes } = require("sequelize");
const { connection, sequelize } = require("../connectDB/dBconnection");

// Definir el modelo Producto
const Producto = sequelize.define("Producto", {
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
  fotoProducto: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  nombreComercial: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  precioVenta: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  precioCompra: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  proveedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Aquí deberías definir la relación con la tabla Proveedor
    // references: {
    //   model: 'Proveedor',
    //   key: 'id'
    // }
  },
  seleccion: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  
},{
    freezeTableName: true
});

// Sincronizar el modelo con la base de datos
Producto.sync({})
  .then(() => {
    console.log("Tabla de Producto Creada");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = Producto;
