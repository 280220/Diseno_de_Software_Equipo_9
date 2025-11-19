# 🤖 Chatbot Support Platform - Sistema Completo

## 📋 Descripción del Proyecto

Plataforma de chatbot académico con **5 casos de uso completamente funcionales**:

1. ✅ **U1 - Ask Question**: Estudiantes hacen preguntas y reciben respuestas inteligentes
2. ✅ **U2 - Upload Documents**: Administradores suben documentos a la base de conocimiento
3. ✅ **U3 - Provide Feedback**: Estudiantes dan feedback (👍/👎) sobre las respuestas
4. ✅ **U4 - View Analytics Dashboard**: Administradores ven métricas y estadísticas
5. ✅ **U5 - View Conversation History**: Usuarios ven su historial de conversaciones

---

## 🚀 Instalación Rápida

### Paso 1: Instalar Dependencias

```bash
# En la carpeta del proyecto
npm install
```

Si tienes problemas, instala Multer manualmente:
```bash
npm install multer
```

### Paso 2: Configurar Variables de Entorno (Opcional)

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=4000
OPENAI_API_KEY=tu_api_key_de_openai
```

**NOTA:** El sistema funciona sin OpenAI real. Usa respuestas basadas en keywords.

### Paso 3: Iniciar el Servidor

```bash
node server.js
```

Deberías ver:
```
✅ Servidor escuchando en el puerto 4000
📊 API disponible en http://localhost:4000/api
💾 Datos almacenados en: /ruta/data
```

### Paso 4: Abrir el Frontend

Abre `index.html` en tu navegador o usa:

```bash
# Si tienes Python instalado
python -m http.server 8000

# O con Node.js (instala http-server)
npx http-server -p 8000
```

Luego abre: `http://localhost:8000`

---

## 📂 Estructura del Proyecto

```
chatbot-support-platform/
├── server.js                 # Backend completo con todos los casos de uso
├── index.html                # Frontend completo (React inline)
├── package.json              # Dependencias del proyecto
├── .env                      # Variables de entorno (opcional)
├── data/                     # Carpeta de almacenamiento (se crea automáticamente)
│   ├── conversations.json    # Historial de conversaciones
│   ├── feedback.json         # Feedback de usuarios
│   ├── documents.json        # Metadata de documentos subidos
│   └── analytics.json        # Métricas del sistema
└── uploads/                  # Documentos subidos por admins
```

---

## 🎯 Casos de Uso - Guía de Demostración

### 🗣️ **Caso de Uso 1: Ask Question (Chat)**

**Flujo:**
1. Login como **Estudiante**
2. Ir a la pestaña **💬 Chat**
3. Escribir preguntas como:
   - "¿Cuál es el horario de atención?"
   - "¿Cómo solicito una beca?"
   - "¿Cuándo abren las inscripciones?"
4. Recibir respuesta inmediata del chatbot
5. Ver el mensaje con formato bonito

**Keywords que el sistema reconoce:**
- `horario`, `hora` → Responde horarios de atención
- `inscripcion`, `matricula` → Información sobre inscripciones
- `beca`, `financiamiento` → Programas de becas
- `biblioteca` → Horarios y servicios de biblioteca
- `tramite`, `certificado` → Trámites administrativos
- `profesor`, `docente` → Contacto con profesores
- `calificacion`, `nota` → Consulta de calificaciones
- `calendario` → Calendario académico

---

### 📤 **Caso de Uso 2: Upload Documents (Solo Admin)**

**Flujo:**
1. Login como **Administrador**
2. Ir a la pestaña **📤 Subir Docs**
3. Seleccionar un archivo (PDF, TXT, DOCX)
4. Hacer clic en "Subir Documento"
5. Ver confirmación de éxito

**Archivos aceptados:** PDF, TXT, DOCX (máx. 10MB)

---

### 👍 **Caso de Uso 3: Provide Feedback**

**Flujo:**
1. Login como **Estudiante**
2. Hacer una pregunta en el **💬 Chat**
3. Después de recibir la respuesta, ver los botones 👍/👎
4. Hacer clic en:
   - **👍** para marcar respuesta útil
   - **👎** para marcar respuesta no útil (pedirá comentario)
5. Ver mensaje "¡Gracias por tu feedback!"

---

### 📊 **Caso de Uso 4: View Analytics Dashboard (Solo Admin)**

**Flujo:**
1. Login como **Administrador**
2. Ir a la pestaña **📊 Analytics**
3. Ver métricas en tiempo real:
   - Total de conversaciones
   - Feedback positivo
   - Feedback negativo
   - Documentos subidos
   - Usuarios activos
   - Tiempo promedio de respuesta

**Las métricas se actualizan automáticamente** con cada acción.

---

### 🕐 **Caso de Uso 5: View Conversation History**

**Flujo:**
1. Login como **Estudiante** o **Admin**
2. Ir a la pestaña **🕐 Historial**
3. Ver todas las conversaciones previas con:
   - Fecha y hora
   - Pregunta realizada
   - Respuesta recibida

---

## 🎬 Guión para Video Demostrativo (6 minutos)

### **Minuto 0-1: Introducción**
- "Hola, soy [Nombre] y presentaremos la Plataforma de Chatbot Académico"
- "Sistema con integración completa Backend-Frontend"
- "Desarrollado con Node.js/Express y React"

### **Minuto 1-2: Caso de Uso 1 - Chat**
- Login como estudiante
- Demostrar 3 preguntas diferentes
- Mostrar respuestas en tiempo real
- Explicar: "Backend procesa keywords y responde desde base de conocimiento"

### **Minuto 2-3: Caso de Uso 3 - Feedback**
- Dar feedback positivo a una respuesta
- Dar feedback negativo con comentario
- Explicar: "Los datos se guardan en feedback.json para análisis posterior"

### **Minuto 3-4: Caso de Uso 2 - Subir Documentos**
- Login como admin
- Subir un archivo PDF
- Mostrar confirmación
- Explicar: "Sistema usa Multer para manejo de archivos, metadata en JSON"

### **Minuto 4-5: Caso de Uso 4 - Analytics**
- Mostrar dashboard con métricas actualizadas
- Explicar cada métrica
- "Datos calculados en tiempo real desde archivos JSON"

### **Minuto 5-6: Caso de Uso 5 - Historial + Cierre**
- Mostrar historial de conversaciones
- Filtrado por usuario
- Cerrar con: "Sistema completo, escalable, listo para producción con BD real"

---

## 🔧 API Endpoints

### **U1: Chat Query**
```
POST /api/chat/query
Body: { "question": "¿Cuál es el horario?", "userId": "student-123" }
Response: { "answer": "...", "timestamp": "..." }
```

### **U2: Upload Document**
```
POST /api/documents/upload
Form-Data: { "document": <file>, "uploadedBy": "admin-123" }
Response: { "message": "...", "document": {...} }
```

### **U3: Submit Feedback**
```
POST /api/feedback
Body: { "userId": "student-123", "messageId": 123, "rating": "positive", "comment": "..." }
Response: { "message": "Feedback registrado" }
```

### **U4: Get Analytics**
```
GET /api/analytics
Response: { "totalConversations": 10, "positiveFeedback": 7, ... }
```

### **U5: Get Conversation History**
```
GET /api/history/:userId
Response: { "userId": "...", "conversations": [...], "total": 5 }
```

---

## ✅ Checklist de Evaluación

### **Integración Técnica (40%)**
- ✅ Conexión sólida Backend-Frontend
- ✅ API RESTful con Express
- ✅ Transferencia de datos JSON
- ✅ Manejo de errores implementado
- ✅ Validaciones en ambas capas

### **Funcionalidad (25%)**
- ✅ 5 casos de uso completamente funcionales
- ✅ Manejo de errores y validaciones
- ✅ Interfaz intuitiva y fácil de usar

### **Diseño y UX (20%)**
- ✅ Interfaz atractiva con Tailwind CSS
- ✅ Diseño coherente y moderno
- ✅ Elementos visuales claros
- ✅ Experiencia de usuario fluida

### **Presentación (15%)**
- ✅ Sistema demostrable en video
- ✅ Explicación clara de decisiones técnicas
- ✅ Comprensión de integración Backend-Frontend

---

## 🛠️ Tecnologías Utilizadas

**Backend:**
- Node.js v18+
- Express.js v5
- Multer (manejo de archivos)
- File System (almacenamiento JSON)

**Frontend:**
- React 18 (via CDN)
- Tailwind CSS (via CDN)
- JavaScript ES6+

**Almacenamiento:**
- JSON files (simula base de datos)
- File system para documentos

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'multer'"
```bash
npm install multer
```

### Error: Puerto 4000 en uso
Cambia el puerto en `server.js` o cierra el proceso:
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :4000
kill -9 <PID>
```

### Frontend no conecta con Backend
Verifica que:
1. El servidor esté corriendo (`node server.js`)
2. La URL en el frontend sea `http://localhost:4000/api`
3. CORS esté habilitado (ya está en el código)

---

## 📝 Notas Importantes

1. **Sin OpenAI Real**: El sistema usa respuestas basadas en keywords. Para usar GPT real, descomenta el código en `server.js` y agrega tu API key.

2. **Almacenamiento Simple**: Usa archivos JSON. Para producción, migrar a MongoDB/PostgreSQL.

3. **Sin Autenticación Real**: El login es simulado. Para producción, implementar JWT.

4. **Multer Requerido**: Necesario para subida de documentos (Caso de Uso 2).


