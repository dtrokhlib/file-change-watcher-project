import express from 'express';
import path from 'path';
import fs from 'fs';
import http from 'http'
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const FILE_TO_TRACK = './log.txt';
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(3000, () => {
  console.log('Server is online');
});

io.on('connection', (socket) => {
  let updatedTextFile = fs.readFileSync(FILE_TO_TRACK).toString();
  socket.emit('file:update', updatedTextFile);
  fs.watch(FILE_TO_TRACK, (event, filename) => {
    if (filename && event === 'change') {
      let updatedTextFile = fs.readFileSync(FILE_TO_TRACK).toString();
      socket.emit('file:update', updatedTextFile);
    }
  });
});
