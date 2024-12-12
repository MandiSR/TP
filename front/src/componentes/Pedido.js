import React, { useState, useEffect } from "react";
import axios from "axios";

function Pedido() {
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");
  const [cliente, setCliente] = useState("");
  const [producto, setProducto] = useState(""); // Producto seleccionado
  const [cantidad, setCantidad] = useState(1); // Cantidad por defecto
  const [pedidosList, setPedidosList] = useState([]); // Inicializar como un array vacío
  const [productosList, setProductosList] = useState([]); // Inicializar como un array vacío
  const [clientesList, setClientesList] = useState([]); // Inicializar como un array vacío
  const [editMode, setEditMode] = useState(false);

  // UseEffect para cargar productos, clientes y pedidos
  useEffect(() => {
    // Cargar productos
    axios
      .get("http://localhost:3001/api/producto/el-producto")
      .then((res) => {
        setProductosList(res.data || []); // Asegurarse de que sea un array vacío en caso de que la respuesta esté vacía
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
      });

    // Cargar clientes
    axios
      .get("http://localhost:3001/api/cliente/usuarios")
      .then((res) => {
        setClientesList(res.data || []); // Asegurarse de que sea un array vacío en caso de que la respuesta esté vacía
      })
      .catch((error) => {
        console.error("Error al cargar clientes:", error);
      });

    // Cargar lista de pedidos
    fetchPedidosList();
  }, []);

  // Función para obtener la lista de pedidos
  const fetchPedidosList = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/pedido");
      console.log("Pedidos obtenidos:", response.data);
      setPedidosList(response.data || []); // Asegurarse de que sea un array vacío en caso de que la respuesta esté vacía
    } catch (error) {
      console.error("Error al cargar pedidos", error);
    }
  };

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Asegurar que haya un producto seleccionado
    if (!producto || cantidad <= 0) {
      alert("Debe seleccionar un producto y una cantidad válida.");
      return;
    }

    const productoSeleccionado = productosList.find((prod) => prod.id === parseInt(producto));
    const totalProducto = productoSeleccionado.precioVenta * cantidad;

    const pedidoData = {
      clienteId: cliente,
      saldoTotal: totalProducto,
      fechaCreacion: fecha,
      productoId: productoSeleccionado.id,
      cantidad,
    };

    try {
      if (editMode) {
        await axios.put(`http://localhost:3001/api/pedido/${id}`, pedidoData);
        alert("Pedido actualizado con éxito");
      } else {
        await axios.post("http://localhost:3001/api/pedido/guardar", pedidoData);
        alert("Pedido guardado con éxito");
      }

      fetchPedidosList(); // Recargar la lista de pedidos
      limpiarCampos(); // Limpiar los campos después de enviar el pedido
    } catch (error) {
      console.error("Error al guardar o actualizar el pedido", error);
      alert("Hubo un error al guardar el pedido.");
    }
  };

  // Función para limpiar los campos del formulario
  const limpiarCampos = () => {
    setId("");
    setFecha("");
    setCliente("");
    setProducto("");
    setCantidad(1); // Restablecer la cantidad a 1
    setEditMode(false);
  };

  // Función para manejar el formato de fecha
  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES"); // Formato: dd/mm/yyyy
  };

  // Función para manejar la edición de un pedido
  const handleEdit = (pedido) => {
    setId(pedido.id);
    setFecha(pedido.fechaCreacion);
    setCliente(pedido.clienteId);
    setProducto(pedido.productoId || ""); // Solo manejamos un producto
    setCantidad(pedido.cantidad || 1);
    setEditMode(true);
  };

  // Función para manejar la eliminación de un pedido
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este pedido?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/api/pedido/${id}`);
        fetchPedidosList(); // Recargar la lista de pedidos
        alert("Pedido eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el pedido", error);
        alert("Hubo un error al eliminar el pedido.");
      }
    }
  };

  return (
    <div>
      {/* Formulario de ingreso de pedido */}
      <div className="card bg-dark border-dark mb-3">
        <div className="card-header">
          <h2 className="text-center bg-dark p-2 text-warning">Datos del Pedido</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Campo cliente */}
            <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
              <span className="label input-group-text">Cliente</span>
              <select
                className="form-control bg-dark p-2 text-white"
                required
                name="cliente"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              >
                <option value="">Seleccione...</option>
                {clientesList && Array.isArray(clientesList) && clientesList.map((cli) => (
                  <option key={cli.id} value={cli.id}>
                    {cli.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Campo fecha */}
            <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
              <span className="label input-group-text bg-dark p-2 text-white">Fecha</span>
              <input
                className="form-control"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            {/* Campo producto */}
            <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
              <span className="label input-group-text">Producto</span>
              <select
                className="form-control bg-dark p-2 text-white"
                required
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
              >
                <option value="">Seleccione...</option>
                {productosList && Array.isArray(productosList) && productosList.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.nombre} - {prod.precioVenta}€
                  </option>
                ))}
              </select>
            </div>

            {/* Campo cantidad */}
            <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
              <span className="label input-group-text bg-dark p-2 text-white">Cantidad</span>
              <input
                className="form-control"
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                min="1"
              />
            </div>

            {/* Botón de agregar */}
            <div className="card-footer text-body-secondary">
              {editMode ? (
                <div>
                  <button className="btn btn-warning m-2" type="submit">
                    Actualizar
                  </button>
                  <button className="btn btn-light m-2" onClick={limpiarCampos}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <button className="btn btn-warning float-end" type="submit">
                  <b>Agregar</b>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Mostrar lista de pedidos */}
      <div className="card text-bg-dark mb-5">
        <h2 className="text-center text-warning">Pedidos Registrados</h2>
        <table className="table table-stripe">
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidosList && Array.isArray(pedidosList) && pedidosList.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.cliente}</td>
                <td>{formatFecha(pedido.fechaCreacion)}</td>
                <td>{pedido.producto} - {pedido.cantidad} x {pedido.saldoTotal}€</td>
                <td>{pedido.saldoTotal}€</td>
                <td>
                  <button className="btn btn-warning m-2" onClick={() => handleEdit(pedido)}>
                    Editar
                  </button>
                  <button className="btn btn-dark m-2" onClick={() => handleDelete(pedido.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pedido;






