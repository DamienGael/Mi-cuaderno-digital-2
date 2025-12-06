import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard');
        setDashboard(response.data);
        setLoading(false);
      } catch (err) {
        setError('⚠️ No se pudo conectar con el servidor');
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }, [end, duration]);
    
    return <span>{count}</span>;
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="book-loader">
          <div className="book">
            <div className="page"></div>
            <div className="page"></div>
            <div className="page"></div>
          </div>
          <p className="loading-text">Cargando Mi Cuaderno Digital...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <div className="error-icon">⚠️</div>
        <h2>{error}</h2>
        <div className="error-tip">
          <p>💡 Asegúrate de que el backend esté corriendo:</p>
          <code>npm run dev</code> en la carpeta /server
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="title animate-float">
            <span className="icon">📚</span> Mi Cuaderno Digital
          </h1>
          <p className="subtitle">Organiza, Entregas, Triunfas</p>
          <p className="tagline">La plataforma que revoluciona la gestión de tareas escolares</p>
          
          <div className="stats-bar">
            <div className="stat-card">
              <div className="stat-number"><CountUp end={dashboard?.estadisticas?.totalTareas || 0} /></div>
              <div className="stat-label">Tareas Totales</div>
            </div>
            <div className="stat-card">
              <div className="stat-number"><CountUp end={dashboard?.estadisticas?.completadas || 0} /></div>
              <div className="stat-label">Completadas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number"><CountUp end={dashboard?.estadisticas?.pendientes || 0} /></div>
              <div className="stat-label">Pendientes</div>
            </div>
            <div className="stat-card">
              <div className="stat-number"><CountUp end={dashboard?.estadisticas?.proximas24h || 0} /></div>
              <div className="stat-label">Próximas 24h</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navegación */}
      <nav className="tabs-nav">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Vista General
        </button>
        <button 
          className={`tab ${activeTab === 'subjects' ? 'active' : ''}`}
          onClick={() => setActiveTab('subjects')}
        >
          📚 Mis Materias
        </button>
        <button 
          className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          📝 Tareas
        </button>
        <button 
          className={`tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          ℹ️ Acerca
        </button>
      </nav>

      {/* Contenido principal */}
      <main className="main-content">
        {activeTab === 'overview' && (
          <div className="overview">
            {/* Materias */}
            <section className="section">
              <h2 className="section-title">📚 Mis Materias</h2>
              <div className="subjects-grid">
                {dashboard?.materias?.map((materia, index) => (
                  <div 
                    key={materia.id} 
                    className="subject-card"
                    style={{ 
                      borderLeftColor: materia.color,
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="subject-icon" style={{ backgroundColor: materia.color }}>
                      {materia.icono}
                    </div>
                    <h3>{materia.nombre}</h3>
                    <p className="profesor">{materia.profesor}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Tareas pendientes */}
            <section className="section">
              <h2 className="section-title">⏰ Tareas Pendientes</h2>
              <div className="tasks-container">
                {dashboard?.tareasPendientes?.map((tarea, index) => (
                  <div 
                    key={tarea.id} 
                    className="task-card"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className={`priority priority-${tarea.prioridad}`}></div>
                    <div className="task-info">
                      <h4>{tarea.titulo}</h4>
                      <div className="task-details">
                        <span className="materia">{tarea.materia}</span>
                        <span className="fecha">📅 {tarea.fechaEntrega}</span>
                      </div>
                    </div>
                    <button className="btn-entregar">
                      📤 Entregar
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="subjects-page">
            <h2 className="section-title">📚 Todas mis Materias</h2>
            <div className="subjects-list">
              {dashboard?.materias?.map((materia) => (
                <div key={materia.id} className="subject-detail">
                  <div className="subject-header">
                    <div className="subject-icon-large" style={{ backgroundColor: materia.color }}>
                      {materia.icono}
                    </div>
                    <div>
                      <h3>{materia.nombre}</h3>
                      <p>Profesor: {materia.profesor}</p>
                    </div>
                  </div>
                  <div className="subject-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '75%' }}></div>
                    </div>
                    <span>75% completado</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="tasks-page">
            <h2 className="section-title">📝 Gestión de Tareas</h2>
            <div className="tasks-board">
              <div className="column">
                <h3>📋 Por Hacer</h3>
                {dashboard?.tareasPendientes?.map(tarea => (
                  <div key={tarea.id} className="task-item">
                    <div className="task-title">{tarea.titulo}</div>
                    <div className="task-meta">{tarea.materia} • {tarea.fechaEntrega}</div>
                  </div>
                ))}
              </div>
              <div className="column">
                <h3>✅ Completadas</h3>
                {dashboard?.tareasCompletadas?.map(tarea => (
                  <div key={tarea.id} className="task-item completed">
                    <div className="task-title">{tarea.titulo}</div>
                    <div className="task-meta">{tarea.materia} • Entregado</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="about-page">
            <div className="about-card">
              <h2>🎯 ¿Qué es Mi Cuaderno Digital?</h2>
              <p className="about-text">
                Una plataforma innovadora donde los profesores comparten tareas y los estudiantes 
                las organizan en su cuaderno virtual para nunca perder el control de sus entregas.
              </p>
              
              <div className="features">
                <div className="feature">
                  <div className="feature-icon">👨‍🏫</div>
                  <h4>Para Profesores</h4>
                  <p>Crea tareas con título, descripción y fecha límite</p>
                </div>
                <div className="feature">
                  <div className="feature-icon">👨‍🎓</div>
                  <h4>Para Estudiantes</h4>
                  <p>Cuaderno virtual con todas las tareas organizadas</p>
                </div>
                <div className="feature">
                  <div className="feature-icon">✅</div>
                  <h4>Sistema de Verificación</h4>
                  <p>Marca tareas como completadas</p>
                </div>
                <div className="feature">
                  <div className="feature-icon">⏰</div>
                  <h4>Recordatorios</h4>
                  <p>Alertas para tareas próximas a vencer</p>
                </div>
              </div>

              <div className="tech">
                <h3>⚙️ Tecnologías</h3>
                <div className="tech-icons">
                  <span title="MongoDB">🍃</span>
                  <span title="Express">🚂</span>
                  <span title="React">⚛️</span>
                  <span title="Node.js">🟢</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>📚 Mi Cuaderno Digital</h4>
            <p>Proyecto Final MERN</p>
            <p>Desarrollado por Damien Gael</p>
          </div>
          <div className="footer-section">
            <h4>🔗 Conexiones</h4>
            <p>Backend: localhost:5000</p>
            <p>Frontend: localhost:5173</p>
            <p className="status">✅ Conectado</p>
          </div>
          <div className="footer-section">
            <h4>📅 Próximamente</h4>
            <p>• Base de datos MongoDB</p>
            <p>• Sistema de login</p>
            <p>• CRUD completo</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Mi Cuaderno Digital</p>
        </div>
      </footer>
    </div>
  );
}

export default App;