// 参考
// https://qiita.com/ij_spitz/items/2c66d501f29bff3830f7

var fs = require('fs');
var http = require('http');
var server = http.createServer();

// 3000番ポートでHTTPとSocket.IOサーバーの待ち受け
server.on('request', function(req, res) {
  var stream = fs.createReadStream('index.html');
  res.writeHead(200, {'Content-Type': 'text/html'});
  stream.pipe(res);
});
var io = require('socket.io').listen(server);

// herokuで動作させるためのポート設定
server.listen(process.env.PORT || 3000);

// コネクション時
io.sockets.on('connection', function(socket) {
  // イベントを待ち受け
  socket.on('keyTyped', function(data) {
    console.log('keyTyped');
    socket.broadcast.emit('keyTyped_notify');
  });
});

