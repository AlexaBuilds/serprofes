const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  if (req.url === '/api' && req.method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      message: 'Bienvenido a la API de Node.js',
      timestamp: new Date().toISOString()
    }));
  } else if (req.url === '/hobbies' && req.method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      hobbies: ['Programación', 'Lectura', 'Deporte']
    }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
