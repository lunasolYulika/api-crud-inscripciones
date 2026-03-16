// server.js
const path = require('path');
const express = require("express");
const connectDB = require("./config/mongoConexion")
const cursoRoutes = require("./routes/curso.routes");// Importo el archivo de rutas
const usuarioRoutes =  require("./routes/usuario.routes");
const inscripcionRoutes =  require("./routes/inscripcion.routes");
const app = express();
const PORT = 3000;

connectDB()
app.use(express.json()); // Para leer JSON
app.use(express.static('public'));  // Middleware para archivos estáticos

// Ruta personalizada para la raíz, sirviendo un archivo estatico
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Asigno las rutas con su prefijo /api/cursos
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/cursos", cursoRoutes); // envio el router correspondiente
app.use("/api/inscripciones", inscripcionRoutes); // envio el router correspondiente


// ========================================================
// Servidor
// ========================================================

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
