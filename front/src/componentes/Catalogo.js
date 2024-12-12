import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom"; // Importar el hook useNavigate
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

function CatalogoProducto() {
  const [catalogoList, setCatalogoList] = useState([]);
  const navigate = useNavigate(); // Crear el hook navigate

  const fetchProductos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/producto/el-producto`);
      console.log(response.data);
      setCatalogoList(response.data);
    } catch (error) {
      console.error("Error fetching productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Función para manejar la redirección al formulario de pedido
  const irAPedido = () => {
    navigate("/pedido"); // Redirigir a la página de pedidos
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        {catalogoList.map((item) => (
          <div key={item.id} className="col-4">
            <Card
              title={item.nombreComercial}
              subTitle={`US$${item.precioVenta}`}
              footer={
                <>
                  <Button
                    label="Pedir"
                    className="btn btn-warning m-2"
                    icon="pi pi-check"
                    onClick={irAPedido} // Acción para redirigir a la página de pedidos
                  />
                </>
              }
              header={
                <img
                  src={`http://localhost:3001/uploads/${item.fotoProducto}`}
                  alt={item.nombre}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              }
              className="w-100 mt-4 shadow-8 surface-card text-center border-round-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatalogoProducto;






