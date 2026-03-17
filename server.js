// SERVIDOR
require('dotenv').config();
const path = require('path');
const express = require("express");
const connectDB = require("./config/mongoConexion")
const cursoRoutes = require("./routes/curso.routes");
const usuarioRoutes =  require("./routes/usuario.routes");
const inscripcionRoutes =  require("./routes/inscripcion.routes");
const app = express();
const PORT = process.env.PORT || 3000; // leido de env

connectDB()
app.use(express.json()); 
app.use(express.static('public'));  // Middleware arch estáticos

// sirviendo archivo estatico
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use("/api/usuarios", usuarioRoutes);
app.use("/api/cursos", cursoRoutes); 
app.use("/api/inscripciones", inscripcionRoutes); 

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
