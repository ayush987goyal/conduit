const http = require('http');
const app = require('./app');

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', () => {
  const addr = server.address();
  console.log('Server listening at port', addr.address + ':' + addr.port);
});
