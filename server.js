
console.log("🚀 Iniciando servidor...");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chat");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/chat", chatRoutes);

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
});

