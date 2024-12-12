import React, { useState, useEffect } from "react";
import axios from 'axios';

function Producto() {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [nombreComercial, setNombreComercial] = useState("");
  const [seleccion, setSeleccion] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");
  const [fotoProducto, setFotoProducto] = useState(null); // Estado para la imagen
  const [proveedores, setProveedores] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [productoInfoList, setProductoInfoList] = useState([]);

  // Cargar los proveedores y productos al inicio
  useEffect(() => {
    axios.get('http://localhost:3001/api/proveedor/')
      .then((res) => {
        setProveedores(res.data);
      })
      .catch((error) => {
        console.error("Error al cargar proveedores:", error);
      });

    fetchProductoList();
  }, []);

  const fetchProductoList = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/producto/el-producto");
      setProductoInfoList(response.data);
    } catch (error) {
      console.error("Error al cargar productos", error);
    }
  };

  // Mapeo de talles a números
  const tallesMap = {
    'XS': 1,
    'S': 2,
    'M': 3,
    'L': 4,
    'XL': 5
  };

  // Mapeo invertido para mostrar el talle como texto
  const tallesInvertidoMap = {
    1: 'XS',
    2: 'S',
    3: 'M',
    4: 'L',
    5: 'XL'
  };

  // Manejo del cambio de imagen
  const handleImageChange = (e) => {
    setFotoProducto(e.target.files[0]); // Guardar el archivo de imagen en el estado
  };

  // Manejo del formulario de envío (crear o editar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir el talle seleccionado a su valor numérico usando el mapeo
    const talleSeleccionado = tallesMap[seleccion];

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("nombreComercial", nombreComercial);
    formData.append("seleccion", talleSeleccionado); // Usamos el valor numérico aquí
    formData.append("precioVenta", precioVenta);
    formData.append("proveedor", proveedor);
    formData.append("precioCompra", precioCompra);
    if (fotoProducto) {
      formData.append("fotoProducto", fotoProducto); // Añadir la foto si está seleccionada
    }

    try {
      if (editMode) {
        // Si estamos en modo de edición, actualizamos el producto
        await axios.put(`http://localhost:3001/api/producto/modificar-producto/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Producto actualizado con éxito");
      } else {
        // Si estamos en modo de creación, agregamos un nuevo producto
        await axios.post("http://localhost:3001/api/producto/guardar", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Producto guardado con éxito");
      }
      fetchProductoList(); // Recargar la lista de productos
      limpiarCampos(); // Limpiar los campos después de guardar o actualizar
    } catch (error) {
      console.error("Error al guardar o actualizar el producto", error);
    }
  };

  // Limpiar los campos del formulario
  const limpiarCampos = () => {
    setId('');
    setNombre('');
    setNombreComercial('');
    setSeleccion('');
    setPrecioVenta('');
    setProveedor('');
    setPrecioCompra('');
    setFotoProducto(null);
    setEditMode(false);
  };

  // Establecer los datos del producto a editar
  const handleEdit = (producto) => {
    setId(producto.id);
    setNombre(producto.nombre);
    setNombreComercial(producto.nombreComercial);
    setSeleccion(producto.seleccion);
    setPrecioVenta(producto.precioVenta);
    setProveedor(producto.proveedor);
    setPrecioCompra(producto.precioCompra);
    setFotoProducto(producto.fotoProducto);
    setEditMode(true);
  };

  // Eliminar producto
  const eliminarProductoInfo = (id) => {
    axios.delete(`http://localhost:3001/api/producto/eliminar/${id}`)
      .then(() => {
        setProductoInfoList(productoInfoList.filter((producto) => producto.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar el producto", error);
      });
  };

  return (
    <div>
      {/* Formulario de ingreso de producto */}
      <div className="card bg-dark border-dark mb-3">
        <div className="card-header">
          <h2 className="text-center bg-dark p-2 text-warning">Datos de los productos</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
              <span className="label input-group-text bg-dark p-2 text-white bg-opacity-75" id="basic-addon1">
                Nombre
              </span>
              <input
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                required
                type="text"
                name="nombre"
                placeholder="Ingrese nombre de producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
              <span className="label input-group-text bg-dark p-2 text-white bg-opacity-75" id="basic-addon1">
                Nombre Comercial
              </span>
              <input
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                required
                type="text"
                name="nombreComercial"
                placeholder="Ingrese nombre comercial de producto"
                value={nombreComercial}
                onChange={(e) => setNombreComercial(e.target.value)}
              />
            </div>

            <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
              <span className="label input-group-text" id="basic-addon1">
                Talle
              </span>
              <select
                className="form-control bg-dark p-2 text-white"
                aria-label="Username"
                aria-describedby="basic-addon1"
                required
                name="seleccion"
                value={seleccion}
                onChange={(e) => setSeleccion(e.target.value)} // Al seleccionar un talle, se actualiza el estado
              >
                <option value="">Seleccione...</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
              <span className="label input-group-text bg-dark p-2 text-white bg-opacity-75" id="basic-addon1">
                Precio Venta
              </span>
              <input
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                required
                type="text"
                name="precioVenta"
                placeholder="Ingrese precio de venta del producto"
                value={precioVenta}
                onChange={(e) => setPrecioVenta(e.target.value)}
              />
            </div>

            <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
              <span className="label input-group-text" id="basic-addon1">
                Proveedor
              </span>
              <select
                className="form-control bg-dark p-2 text-white"
                aria-label="Username"
                aria-describedby="basic-addon1"
                required
                name="proveedor"
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value)}
              >
                <option value="">Seleccione...</option>
                {proveedores.map((prov) => (
                  <option key={prov.id} value={prov.id}>
                    {prov.id} - {prov.nombre} - {prov.cuit}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
              <span className="label input-group-text bg-dark p-2 text-white bg-opacity-75" id="basic-addon1">
                Precio Compra
              </span>
              <input
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                required
                type="text"
                name="precioCompra"
                placeholder="Ingrese precio de compra del producto"
                value={precioCompra}
                onChange={(e) => setPrecioCompra(e.target.value)}
              />
            </div>

            <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
              <span className="label input-group-text bg-dark p-2 text-white bg-opacity-75" id="basic-addon1">
                Imagen
              </span>
              <input
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                required
                type="file"
                name="fotoProducto"
                onChange={handleImageChange}
              />
            </div>

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
    
        {/* Lista de productos */}
        <div className="card text-bg-dark mb-5">
          <h2 className="text-center text-warning">Lista de Productos</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Nombre Comercial</th>
                <th scope="col">Talle</th>
                <th scope="col">Precio Venta</th>
                <th scope="col">Proveedor</th>
                <th scope="col">Precio Compra</th>
                <th scope="col">Imagen</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productoInfoList.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.nombreComercial}</td>
                  <td>{tallesInvertidoMap[producto.seleccion]}</td> {/* Mostrar el talle como texto */}
                  <td>{producto.precioVenta}</td>
                  <td>{producto.proveedor}</td>
                  <td>{producto.precioCompra}</td>
                  <td>
                    {producto.fotoProducto && (
                      <img
                        src={producto.fotoProducto}
                        alt={`Producto ${producto.id}`}
                        width="100"
                        height="100"
                      />
                    )}
                  </td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button
                        type="button"
                        className="btn btn-warning m-2"
                        onClick={() => handleEdit(producto)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark m-2"
                        onClick={() => eliminarProductoInfo(producto.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    
    
}

export default Producto;


