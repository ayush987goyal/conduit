const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('morgan');

const app = express();
const server = http.createServer(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', () => {
  const addr = server.address();
  console.log('Server listening at port', addr.address + ':' + addr.port);
});
