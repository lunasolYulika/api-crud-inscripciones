const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connectionString = "mongodb+srv://lunasolyulika_db_user:andromeda@cluster0.csj4ojh.mongodb.net/?appName=Cluster0"
    //mongoose.connect("mongodb://yulika:1234@ac-b2k9u9t-shard-00-00.csj4ojh.mongodb.net:27017,ac-b2k9u9t-shard-00-01.csj4ojh.mongodb.net:27017,ac-b2k9u9t-shard-00-02.csj4ojh.mongodb.net:27017/TU_DB?ssl=true&replicaSet=atlas-xxxx-shard-0&authSource=admin&retryWrites=true&w=majority")
    //const connectionString = "mongodb://lunasolyulika_db_user:1234@ac-b2k9u9t-shard-00-00.csj4ojh.mongodb.net:27017,ac-b2k9u9t-shard-00-01.csj4ojh.mongodb.net:27017,ac-b2k9u9t-shard-00-02.csj4ojh.mongodb.net:27017/test?tls=true&replicaSet=atlas-b2k9u9t-shard-0&authSource=admin&retryWrites=true&w=majority";


    // conexión moderna SIN opciones adicionales
    await mongoose.connect(connectionString);

    console.log('Conectado a MongoDB exitosamente');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
