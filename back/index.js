require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: [
    'https://final-c7e61.web.app/protected', // URL del nuevo deploy del frontend
    'https://final-c7e61.firebaseapp.com/',  // URL alternativa del nuevo deploy
  ],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // Permitir cookies y headers personalizados
};

app.use(cors(corsOptions));

// Middleware para manejar encabezados adicionales
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Middleware para manejar JSON
app.use(express.json());

// Importar rutas
const proveedorroutes = require('./routes/proveedorRoute');
const clienteroutes = require('./routes/clienteRoute');
const productoroutes = require('./routes/productoRoute');
const pedidoroutes = require('./routes/pedidoRoute');

// Configuración de las rutas
app.use('/api/proveedor', proveedorroutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/cliente', clienteroutes);
app.use('/api/producto', productoroutes);
app.use('/api/pedido', pedidoroutes);

// Configuración del puerto
const PORT = process.env.PORT || 3001;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});




// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');

// const app = express();

// // Configuración de CORS
// const corsOptions = {
//   origin: [
//     'https://final-9adbe.web.app', // URL del frontend en Firebase
//     'https://final-9adbe.firebaseapp.com' // URL alternativa
//   ],
//   methods: 'GET,POST,PUT,DELETE',
//   credentials: true,
// };
// app.use(cors(corsOptions));

// // Middleware para manejar JSON
// app.use(express.json());

// // Importar rutas
// const proveedorroutes = require('./routes/proveedorRoute');
// const clienteroutes = require('./routes/clienteRoute');
// const productoroutes = require('./routes/productoRoute');
// const pedidoroutes = require('./routes/pedidoRoute');

// // Configuración de las rutas
// app.use('/api/proveedor', proveedorroutes);
// app.use('/uploads', express.static('uploads'));
// app.use('/api/cliente', clienteroutes);
// app.use('/api/producto', productoroutes);
// app.use('/api/pedido', pedidoroutes);

// // Configuración del puerto
// const PORT = process.env.PORT || 3001;

// // Iniciar el servidor
// app.listen(PORT, () => {
//   console.log('Listening on port ' + PORT);
// });