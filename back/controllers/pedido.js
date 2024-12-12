const connection = require("../connectDB/dBconnection");

// Función para obtener todos los pedidos
function getAllPedidos(req, res) {
    const query = `
        SELECT p.id, p.fechaCreacion, p.saldoTotal, p.cantidad, 
               c.nombre AS cliente, pr.nombre AS producto
        FROM pedido p
        JOIN cliente c ON p.clienteId = c.id
        JOIN producto pr ON p.productoId = pr.id
    `;

    connection.query(query, (err, result) => {
        if (err) {
            console.error("Error al consultar pedidos: ", err);
            res.status(500).json({ error: "Error al obtener pedidos de la base de datos" });
        } else {
            res.json(result);
        }
    });
}

// Crear un nuevo pedido con un solo producto
function createPedido(req, res) {
    const { clienteId, saldoTotal, fechaCreacion, productoId, cantidad } = req.body;

    // Validación de entrada
    if (!clienteId || !saldoTotal || !productoId || cantidad <= 0) {
        return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    // Insertar el pedido principal
    const query = "INSERT INTO pedido (clienteId, saldoTotal, fechaCreacion, productoId, cantidad) VALUES (?, ?, ?, ?, ?)";
    connection.query(query, [clienteId, saldoTotal, fechaCreacion, productoId, cantidad], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "No se pudo insertar el pedido" });
        } else {
            res.json({ message: "Pedido creado con éxito" });
        }
    });
}

// Actualizar un pedido con un solo producto
function updatePedido(req, res) {
    const id = req.params.id;
    const { clienteId, saldoTotal, fechaCreacion, productoId, cantidad } = req.body;

    // Validación de entrada
    if (!clienteId || !saldoTotal || !productoId || cantidad <= 0) {
        return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    // Actualizar el pedido
    const query = "UPDATE pedido SET clienteId = ?, saldoTotal = ?, fechaCreacion = ?, productoId = ?, cantidad = ? WHERE id = ?";
    connection.query(query, [clienteId, saldoTotal, fechaCreacion, productoId, cantidad, id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "No se pudo actualizar el pedido" });
        } else {
            res.json({ message: "Pedido actualizado con éxito" });
        }
    });
}

// Eliminar un pedido
function deletePedido(req, res) {
    const id = req.params.id;

    const query = "DELETE FROM pedido WHERE id = ?";
    connection.query(query, [id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "No se pudo eliminar el pedido" });
        } else {
            res.json({ message: "Pedido eliminado con éxito" });
        }
    });
}

module.exports = {
    getAllPedidos,
    createPedido,
    updatePedido,
    deletePedido
};




