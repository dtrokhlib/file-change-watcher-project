const socket = io();

socket.on('file:update', (updatedTextFile) => {
  document.body.innerHTML = updatedTextFile;
});
