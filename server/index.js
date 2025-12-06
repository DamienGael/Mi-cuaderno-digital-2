const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const datosDemo = {
  materias: [
    { id: 1, nombre: 'Matemáticas', profesor: 'Prof. Rodríguez', color: '#FF6B6B', icono: '🧮' },
    { id: 2, nombre: 'Español', profesor: 'Prof. Martínez', color: '#4ECDC4', icono: '📖' },
    { id: 3, nombre: 'Historia', profesor: 'Prof. González', color: '#FFD166', icono: '🏛️' },
    { id: 4, nombre: 'Ciencias', profesor: 'Prof. Ramírez', color: '#06D6A0', icono: '🔬' }
  ],
  tareasPendientes: [
    { id: 1, titulo: 'Ejercicios de álgebra', materia: 'Matemáticas', fechaEntrega: '2024-12-15', prioridad: 'alta' },
    { id: 2, titulo: 'Ensayo literario', materia: 'Español', fechaEntrega: '2024-12-12', prioridad: 'media' },
    { id: 3, titulo: 'Línea del tiempo', materia: 'Historia', fechaEntrega: '2024-12-18', prioridad: 'baja' }
  ],
  tareasCompletadas: [
    { id: 4, titulo: 'Reporte científico', materia: 'Ciencias', fechaEntrega: '2024-12-05', completada: true }
  ],
  estadisticas: {
    totalTareas: 4,
    completadas: 1,
    pendientes: 3,
    proximas24h: 1
  }
};

app.get('/', (req, res) => {
  res.json({ 
    proyecto: 'Mi Cuaderno Digital',
    eslogan: 'Organiza, Entregas, Triunfas',
    descripcion: 'Plataforma donde los profesores comparten tareas y los estudiantes las organizan en su cuaderno virtual',
    version: '2.0.0',
    desarrollador: 'Damien Gael',
    endpoints: {
      dashboard: '/api/dashboard',
      materias: '/api/materias',
      tareas: '/api/tareas',
      estadisticas: '/api/estadisticas',
      salud: '/api/salud'
    }
  });
});

app.get('/api/dashboard', (req, res) => {
  res.json(datosDemo);
});

app.get('/api/materias', (req, res) => {
  res.json(datosDemo.materias);
});

app.get('/api/tareas', (req, res) => {
  res.json({
    pendientes: datosDemo.tareasPendientes,
    completadas: datosDemo.tareasCompletadas
  });
});

app.get('/api/estadisticas', (req, res) => {
  res.json(datosDemo.estadisticas);
});

app.get('/api/salud', (req, res) => {
  res.json({
    status: '✅ Perfecto',
    timestamp: new Date().toLocaleString('es-MX'),
    proyecto: 'Mi Cuaderno Digital'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('✨'.repeat(50));
  console.log('       📚 MI CUADERNO DIGITAL 📚      ');
  console.log('✨'.repeat(50));
  console.log(`🚀 Servidor: http://localhost:${PORT}`);
  console.log(`📡 Puerto: ${PORT}`);
  console.log('');
  console.log('🔗 Endpoints disponibles:');
  console.log(`   📊  http://localhost:${PORT}/api/dashboard`);
  console.log(`   📚  http://localhost:${PORT}/api/materias`);
  console.log(`   📝  http://localhost:${PORT}/api/tareas`);
  console.log(`   📈  http://localhost:${PORT}/api/estadisticas`);
  console.log(`   ❤️  http://localhost:${PORT}/api/salud`);
  console.log('');
  console.log('🕐 ' + new Date().toLocaleString('es-MX'));
  console.log('✨'.repeat(50));
});