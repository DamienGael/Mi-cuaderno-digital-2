const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: '¡Hola desde el Backend de Mi Cuaderno Digital!',
    status: 'success',
    project: 'Mi Cuaderno Digital',
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'mi-cuaderno-digital-backend'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 SERVIDOR BACKEND INICIADO');
  console.log(`📡 Puerto: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📚 Proyecto: Mi Cuaderno Digital`);
  console.log(`🕐 ${new Date().toLocaleTimeString()}`);
  console.log('='.repeat(50));
});