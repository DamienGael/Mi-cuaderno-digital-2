import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/');
        setBackendData(response.data);
        setLoading(false);
      } catch (err) {
        setError('❌ No se pudo conectar con el backend');
        setLoading(false);
        console.error('Error:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>📚 Mi Cuaderno Digital</h1>
        <p>Sistema de gestión de tareas escolares</p>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2>🔄 Estado de Conexión</h2>
          
          {loading ? (
            <div style={styles.loading}>
              <p>Conectando con el servidor...</p>
              <div style={styles.spinner}></div>
            </div>
          ) : error ? (
            <div style={styles.error}>
              <p>{error}</p>
              <p style={styles.tip}>
                💡 Asegúrate de que el servidor esté corriendo:<br/>
                <code>npm run dev</code> en la carpeta /server
              </p>
            </div>
          ) : (
            <div style={styles.success}>
              <h3>✅ ¡CONEXIÓN EXITOSA!</h3>
              <p><strong>Mensaje:</strong> {backendData?.message}</p>
              <p><strong>Proyecto:</strong> {backendData?.project}</p>
              <p><strong>Versión:</strong> {backendData?.version}</p>
              <p><strong>Estado:</strong> {backendData?.status}</p>
              
              <div style={styles.urls}>
                <p>🔗 Backend: <a href="http://localhost:5000" target="_blank" rel="noreferrer">http://localhost:5000</a></p>
                <p>🔗 Frontend: <a href="http://localhost:5173" target="_blank" rel="noreferrer">http://localhost:5173</a></p>
              </div>
            </div>
          )}
        </div>

        <div style={styles.info}>
          <h2>🎯 Actividad 4 Completada</h2>
          <p>Stack MERN configurado correctamente:</p>
          <ul style={styles.list}>
            <li>✅ MongoDB (próximamente)</li>
            <li>✅ Express.js (funcionando)</li>
            <li>✅ React (funcionando)</li>
            <li>✅ Node.js (funcionando)</li>
          </ul>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© 2024 Mi Cuaderno Digital - Actividad 4: Configuración MERN</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    padding: '40px 0',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '10px',
    marginBottom: '30px'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  card: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  loading: {
    textAlign: 'center',
    padding: '20px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #4CAF50',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '20px auto'
  },
  error: {
    backgroundColor: '#ffebee',
    border: '2px solid #f44336',
    padding: '20px',
    borderRadius: '5px',
    color: '#d32f2f'
  },
  success: {
    backgroundColor: '#e8f5e9',
    border: '2px solid #4CAF50',
    padding: '20px',
    borderRadius: '5px',
    color: '#2e7d32'
  },
  tip: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffecb5',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '10px',
    color: '#856404'
  },
  urls: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#e3f2fd',
    borderRadius: '5px'
  },
  info: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  list: {
    lineHeight: '2',
    paddingLeft: '20px'
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
    padding: '20px',
    color: '#666',
    borderTop: '1px solid #ddd'
  }
};

export default App;