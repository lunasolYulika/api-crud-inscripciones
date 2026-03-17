const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    //const connectionString = "mongodb+srv://lunasolyulika_db_user:andromeda@cluster0.csj4ojh.mongodb.net/?appName=Cluster0"
    const uri = process.env.MONGO_URI
    if (!uri)
      throw new Error('MONGO_URI no definida en las variables de entorno');

    // conexión moderna SIN opciones adicionales
    await mongoose.connect(uri);
    console.log('Conectado a MongoDB exitosamente');

    // eventos de conexión
    
    mongoose.connection.on('disconnected',()=>{
      console.warn('MongoDB desconectado')
    });

    
    mongoose.connection.on('error',(err)=>{
      console.error('Error en MongoDB: ', err)
    })


  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);// Corta el proceso si no hay DB
  }
};

module.exports = connectDB;
