import React, {useState, useEffect} from "react";
import axios from 'axios';



function Cliente(){
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [cuit, setCuit] = useState("");

    const [editMode, setEditMode] = useState(false);
      const [editingIndex, setEditingIndex] = useState(null);


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("id", id);
  //   formData.append("nombre", nombre);
  //   formData.append("cuit", cuit);
  //   if (editMode) {
  //      const updatedList = clienteList.map((item, index) => 
  //         index === editingIndex ? formData : item
  //       );
  //       setClienteList(updatedList);
  //       setEditMode(false);
  //       setEditingIndex(null);
  //     } 
  //     else{
  //       try {
  //         await axios.post("http://localhost:3001/api/cliente/guardar", formData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         });
  //         alert("Cliente guardado con éxito");
  //       } catch (error) {
  //         console.error("Error al guardar el cliente", error);
  //       }
  //  }
  //  limpiarCampos();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientData = {
      id: id,
      nombre: nombre,
      cuit: cuit,
    };
  
    if (editMode) {
      const updatedList = clienteList.map((item, index) =>
        index === editingIndex ? clientData : item
      );
      setClienteList(updatedList);
      setEditMode(false);
      setEditingIndex(null);
    } else {
      try {
        await axios.post("http://localhost:3001/api/cliente/guardar", clientData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        alert("Cliente guardado con éxito");
      } catch (error) {
        console.error("Error al guardar el cliente", error);
      }
    }
  
    limpiarCampos();
  };
  

  const handleEdit = (cliente) => {
    setId(cliente.id);
    setNombre(cliente.nombre);
    setCuit(cliente.cuit);
    
    setEditMode(true);
    setEditingIndex(cliente);
    
  };

  const limpiarCampos=()=>{
    
        setId('');
        setNombre('');
        setCuit('');
        
    setEditMode(false);
  }

  const updateCliente = () => {
    axios.put(`http://localhost:3001/api/cliente/modificar-cliente/${id}`, {
      id: id,
      nombre: nombre,
      cuit:cuit,
      })
      .then(() => {
        limpiarCampos();
      });
      alert("Datos guardados desde el boton de actualizar exitosamente!");
  };
  

  //LISTADO DE Clientes
  const [clienteList, setClienteList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3001/api/cliente/usuarios"
      );
      const data = await response.json();
      setClienteList(data);
    };
    fetchData();
  }, []);

  const eliminarCliente = (id) => {
    axios
      .delete(`http://localhost:3001/api/cliente/eliminar/${id}`)
      .then(() => {
        setClienteList(
            clienteList.filter((cliente) => cliente.id !== id)
        );
      });
    };
    

    return(
        <div>
            <div className="card bg-dark border-dark mb-3">
        <div className="card-header">
          <h2 className="text-center bg-dark p-2 text-warning">Datos de los Clientes</h2>
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
              type='text'
              name='nombre'
              placeholder='Ingrese el nombre del Cliente'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
          <span className="label input-group-text bg-dark p-2 text-white bg-opacity-75" id="basic-addon1">
                Cuit
              </span>
            <input
            className="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            required
              type='text'
              name='cuit'
              placeholder='Ingrese el cuit del Cliente'
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
            />
          </div>
          <div className="card-footer text-body-secondary">
                {editMode ? (
                  <div>
                    <button className="btn btn-dark m-2" onClick={updateCliente}>
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

      <div className="card text-bg-dark mb-5">
        <h2 className="text-center text-warning">Lista de Clientes</h2>
        <table
          className="table table-striped "
          tableStyle={{ minWidth: "50rem" }}
        >
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Cuit</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clienteList.map((cliente, key) => {
              return (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.cuit}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button type="button" className="btn btn-warning m-2"
                          onClick={() => handleEdit(cliente)}>
                            Editar
                          </button>
                          <button
                            type="button"
                            className="btn btn-dark m-2"
                            onClick={() => eliminarCliente(cliente.id)}
                          >
                            Eliminar
                          </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

        
    </div>
    )
}

export default Cliente;

