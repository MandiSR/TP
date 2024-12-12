const express= require('express');
const app= express();
const cors = require('cors');

app.use(cors());



app.use(express.json());


const proveedorroutes= require('./routes/proveedorRoute');
const clienteroutes= require('./routes/clienteRoute');
const productoroutes= require('./routes/productoRoute');
const pedidoroutes= require('./routes/pedidoRoute');


app.use('/api/proveedor',proveedorroutes)
app.use('/uploads', express.static('uploads'));
app.use('/api/cliente',clienteroutes)
app.use('/api/producto',productoroutes)
app.use('/api/pedido',pedidoroutes)

const PORT = process.env.PORT || 3001;

app.listen(PORT,() =>{
     console.log('listening on port '+PORT);
 });


