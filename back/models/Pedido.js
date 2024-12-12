const { connection, sequelize } = require("../connectDB/dBconnection");
const { DataTypes } = require("sequelize");

const Pedido = sequelize.define('Pedido', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Define la relación con la tabla Cliente
      references: {
        model: 'Cliente', // Asegúrate de que el nombre del modelo sea correcto
        key: 'id'
      }
    },
    proveedorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // Define la relación con la tabla Proveedor
      // references: {
      //   model: 'Proveedor', // Asegúrate de que el nombre del modelo sea correcto
      //   key: 'id'
      // }
    },
    saldoTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW 
    },
    nuevaColumna: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Define la relación con la tabla Producto
      references: {
        model: 'Producto', // Asegúrate de que el nombre del modelo sea correcto
        key: 'id'
      }
    },
    productos: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    freezeTableName: true // Para que la tabla se llame "Pedido"
  });
 

Pedido.sync({})
  .then(() => {
    console.log("Tabla de Pedido Creada");
  })
  .catch((error) => {
    console.log(error);
  });

  module.exports = Pedido;