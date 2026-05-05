// SERVIDOR
require('dotenv').config();
const path = require('path');
const express = require("express");
const helmet = require('helmet');
const cors = require("cors")
const morgan = require("morgan")
const connectDB = require("./config/mongoConexion")
const cursoRoutes = require("./routes/curso.routes");
const usuarioRoutes =  require("./routes/usuario.routes");
const inscripcionRoutes =  require("./routes/inscripcion.routes");
const authRoutes = require('./routes/auth.routes')
const app = express();
const PORT = process.env.PORT || 3000; // leido de env

connectDB()
// MIDDLEWARES
app.use(helmet())
app.use(cors())
app.use(morgan("dev"))
app.use(express.json()); 

app.get('/', (req, res) => {
  res.redirect('/login.html');
});


app.use(express.static('public', {
  etag: false,
  maxAge: 0,
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-store');
  }
}));

app.use("/api/auth",authRoutes)
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/cursos", cursoRoutes); 
app.use("/api/inscripciones", inscripcionRoutes); 

app.use((err, req, res, next) => { // catch err gral server
 console.error(err.stack);
 res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
