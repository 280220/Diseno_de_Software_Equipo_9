console.log("🚀 Iniciando servidor...");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de Multer para subida de archivos
const upload = multer({ 
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB máximo
});

// Directorios para almacenamiento
const DATA_DIR = path.join(__dirname, "data");
const UPLOADS_DIR = path.join(__dirname, "uploads");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// Archivos de datos (simulan base de datos)
const CONVERSATIONS_FILE = path.join(DATA_DIR, "conversations.json");
const FEEDBACK_FILE = path.join(DATA_DIR, "feedback.json");
const DOCUMENTS_FILE = path.join(DATA_DIR, "documents.json");
const ANALYTICS_FILE = path.join(DATA_DIR, "analytics.json");

// Inicializar archivos si no existen
const initFile = (filePath, defaultData = []) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

initFile(CONVERSATIONS_FILE);
initFile(FEEDBACK_FILE);
initFile(DOCUMENTS_FILE);
initFile(ANALYTICS_FILE, {
  totalConversations: 0,
  positiveFeedback: 0,
  negativeFeedback: 0,
  totalDocuments: 0,
  activeUsers: 0,
  avgResponseTime: "2.5s"
});

// Funciones de lectura/escritura
const readJSON = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return [];
  }
};

const writeJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// ============================================
// RUTAS - CASOS DE USO
// ============================================

// U1: Ask Question (Chat Query)
app.post("/api/chat/query", async (req, res) => {
  const { question, userId } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Falta el parámetro 'question'" });
  }

  try {
    // Simulación de respuesta inteligente basada en keywords
    let answer = "Lo siento, no tengo información específica sobre eso. ¿Podrías reformular tu pregunta?";

    const questionLower = question.toLowerCase();

    // Base de conocimiento simple
    if (questionLower.includes("horario") || questionLower.includes("hora")) {
      answer = "Los horarios de atención son de lunes a viernes de 8:00 AM a 6:00 PM. Los sábados de 9:00 AM a 1:00 PM.";
    } else if (questionLower.includes("inscripcion") || questionLower.includes("matricula")) {
      answer = "El proceso de inscripción se realiza en línea a través del portal estudiantil. Necesitas tu número de matrícula y contraseña. Las inscripciones para el próximo semestre abren el 1 de diciembre.";
    } else if (questionLower.includes("beca") || questionLower.includes("financiamiento")) {
      answer = "Contamos con varios programas de becas: académicas, deportivas y socioeconómicas. Puedes solicitar información en la Oficina de Apoyo Financiero o enviar un correo a becas@universidad.edu";
    } else if (questionLower.includes("biblioteca")) {
      answer = "La biblioteca está abierta de lunes a viernes de 7:00 AM a 10:00 PM y sábados de 8:00 AM a 6:00 PM. Puedes renovar tus préstamos en línea hasta 3 veces.";
    } else if (questionLower.includes("tramite") || questionLower.includes("certificado")) {
      answer = "Los trámites administrativos se realizan en Servicios Escolares. Para certificados y constancias, el tiempo de entrega es de 5 días hábiles. Puedes solicitarlos en línea.";
    } else if (questionLower.includes("profesor") || questionLower.includes("docente")) {
      answer = "Puedes consultar el horario de atención de tus profesores en el portal académico. También puedes contactarlos por correo institucional.";
    } else if (questionLower.includes("calificacion") || questionLower.includes("nota")) {
      answer = "Las calificaciones se publican en el portal estudiantil 15 días después del fin del semestre. Si tienes dudas sobre alguna calificación, contacta directamente a tu profesor.";
    } else if (questionLower.includes("calendario")) {
      answer = "El calendario académico está disponible en el portal. El próximo periodo de exámenes es del 15 al 22 de diciembre. Las vacaciones de invierno son del 23 de diciembre al 10 de enero.";
    } else if (questionLower.includes("hola") || questionLower.includes("buenos dias") || questionLower.includes("saludos")) {
      answer = "¡Hola! Soy tu asistente académico virtual. Estoy aquí para ayudarte con información sobre horarios, inscripciones, becas, biblioteca, trámites y más. ¿En qué puedo ayudarte?";
    }

    // Guardar conversación
    const conversations = readJSON(CONVERSATIONS_FILE);
    conversations.push({
      userId,
      question,
      answer,
      timestamp: new Date().toISOString()
    });
    writeJSON(CONVERSATIONS_FILE, conversations);

    // Actualizar analytics
    const analytics = readJSON(ANALYTICS_FILE);
    analytics.totalConversations = (analytics.totalConversations || 0) + 1;
    
    // Contar usuarios únicos
    const uniqueUsers = new Set(conversations.map(c => c.userId));
    analytics.activeUsers = uniqueUsers.size;
    
    writeJSON(ANALYTICS_FILE, analytics);

    res.json({ answer, timestamp: new Date().toISOString() });

  } catch (error) {
    console.error("Error al procesar la consulta:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

// U2: Upload Documents (Solo Admin)
app.post("/api/documents/upload", upload.single("document"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se proporcionó ningún archivo" });
    }

    const documents = readJSON(DOCUMENTS_FILE);
    const newDoc = {
      id: Date.now().toString(),
      filename: req.file.originalname,
      path: req.file.path,
      uploadedBy: req.body.uploadedBy || "admin",
      uploadedAt: new Date().toISOString(),
      size: req.file.size
    };

    documents.push(newDoc);
    writeJSON(DOCUMENTS_FILE, documents);

    // Actualizar analytics
    const analytics = readJSON(ANALYTICS_FILE);
    analytics.totalDocuments = documents.length;
    writeJSON(ANALYTICS_FILE, analytics);

    res.json({ 
      message: "Documento subido exitosamente", 
      document: newDoc 
    });
  } catch (error) {
    console.error("Error al subir documento:", error);
    res.status(500).json({ error: "Error al subir el documento" });
  }
});

// U3: Provide Feedback
app.post("/api/feedback", (req, res) => {
  try {
    const { userId, messageId, rating, comment, timestamp } = req.body;

    const feedback = readJSON(FEEDBACK_FILE);
    feedback.push({
      userId,
      messageId,
      rating,
      comment: comment || "",
      timestamp: timestamp || new Date().toISOString()
    });
    writeJSON(FEEDBACK_FILE, feedback);

    // Actualizar analytics
    const analytics = readJSON(ANALYTICS_FILE);
    if (rating === "positive") {
      analytics.positiveFeedback = (analytics.positiveFeedback || 0) + 1;
    } else if (rating === "negative") {
      analytics.negativeFeedback = (analytics.negativeFeedback || 0) + 1;
    }
    writeJSON(ANALYTICS_FILE, analytics);

    res.json({ message: "Feedback registrado exitosamente" });
  } catch (error) {
    console.error("Error al guardar feedback:", error);
    res.status(500).json({ error: "Error al guardar el feedback" });
  }
});

// U4: View Analytics Dashboard (Solo Admin)
app.get("/api/analytics", (req, res) => {
  try {
    const analytics = readJSON(ANALYTICS_FILE);
    const conversations = readJSON(CONVERSATIONS_FILE);
    const feedback = readJSON(FEEDBACK_FILE);
    const documents = readJSON(DOCUMENTS_FILE);

    // Calcular métricas en tiempo real
    const uniqueUsers = new Set(conversations.map(c => c.userId));
    
    const result = {
      totalConversations: conversations.length,
      positiveFeedback: feedback.filter(f => f.rating === "positive").length,
      negativeFeedback: feedback.filter(f => f.rating === "negative").length,
      totalDocuments: documents.length,
      activeUsers: uniqueUsers.size,
      avgResponseTime: "2.5s" // Simplificado
    };

    res.json(result);
  } catch (error) {
    console.error("Error al cargar analytics:", error);
    res.status(500).json({ error: "Error al cargar analytics" });
  }
});

// U5: View Conversation History
app.get("/api/history/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = readJSON(CONVERSATIONS_FILE);
    
    const userConversations = conversations
      .filter(c => c.userId === userId)
      .map(c => ({
        message: c.question,
        answer: c.answer,
        timestamp: c.timestamp
      }));

    res.json({ 
      userId, 
      conversations: userConversations,
      total: userConversations.length
    });
  } catch (error) {
    console.error("Error al cargar historial:", error);
    res.status(500).json({ error: "Error al cargar el historial" });
  }
});

// Ruta para obtener lista de documentos (Admin)
app.get("/api/documents", (req, res) => {
  try {
    const documents = readJSON(DOCUMENTS_FILE);
    res.json({ documents, total: documents.length });
  } catch (error) {
    console.error("Error al listar documentos:", error);
    res.status(500).json({ error: "Error al listar documentos" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    message: "Servidor funcionando correctamente"
  });
});

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
  console.log(`📊 API disponible en http://localhost:${PORT}/api`);
  console.log(`💾 Datos almacenados en: ${DATA_DIR}`);
});
