# Chatbot Support Backend

Este proyecto es el backend para un chatbot académico que utiliza la API de OpenAI.  
Está construido con **Node.js**, **Express**, y la librería oficial de **OpenAI**.

## 🚀 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/<tu-usuario>/<nombre-del-repo>.git
   cd chatbot-support-backend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:**
   ```bash
   PORT=4000
   OPENAI_API_KEY=tu_api_key_de_openai
   ```

4. **Iniciar el servidor:**
   ```bash
   node server.js
   ```

El servidor correrá en:  
👉 http://localhost:4000


---

## 🖥️ Frontend (index.html)

Este proyecto incluye una interfaz web sencilla (frontend) creada con **React UMD** y **Tailwind CSS**, la cual se comunica con el backend sin necesidad de modificar el código existente.

### Pasos para ejecutarlo

1. **Crear el archivo `index.html`**
   En la raíz del proyecto (junto a `server.js`), crea un archivo llamado `index.html` y pega el código del frontend.

2. **Ejecutar el backend**
   ```bash
   npm install
   node server.js
   ```
   Verás en la terminal:
   ```
   ✅ Servidor escuchando en el puerto 4000
   ```

3. **Abrir el frontend**
   - Haz doble clic en el archivo `index.html` para abrirlo en tu navegador, o  
   - Usa la extensión “Live Server” de VS Code.  

   El frontend intentará conectarse automáticamente a:
   ```
   http://localhost:4000/api/chat/query
   ```
   y mostrará el estado **“Conectado”** en la barra azul superior.

4. **Probar la aplicación**
   - Escribe una pregunta, por ejemplo: `¿Qué es REST?` → clic en **Enviar**.  
     Verás tu mensaje, el loader, y la respuesta del bot.  
   - Envía un mensaje vacío para ver el banner rojo de validación.

---

## 📎 Nota

Este frontend no requiere ningún cambio en el backend.  
Si el backend se despliega en la nube (Render, Railway, etc.), solo actualiza la línea `API_URL` dentro del `index.html` con la nueva URL.

---

## 📄 Licencia

Este proyecto se distribuye con fines educativos y puede ser adaptado libremente para propósitos académicos o de demostración.
