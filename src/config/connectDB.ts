import mongoose from "mongoose";
import dotenv from "dotenv";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Obtener la cadena de conexión desde la variable de entorno
const mongoURI = process.env.MONGO_URL || "";

// Verificar que la cadena de conexión no esté vacía
if (!mongoURI) {
  console.error(
    "La cadena de conexión de MongoDB no está definida en el archivo .env"
  );
  process.exit(1);
}

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);

    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error de conexión a MongoDB:", error);
    process.exit(1); // Salir del proceso si la conexión falla
  }
};

// Exportar la función de conexión
export default connectDB;
