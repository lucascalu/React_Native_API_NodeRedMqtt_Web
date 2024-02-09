// variavel.js
const http = require('http');
const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://seu-broker-mqtt-sem-porta-1883');
let minhaVariavel = '';

client.on('connect', function () {
  console.log('Conectado ao broker MQTT');
  client.subscribe('teste', { qos: 0 }, function (err) {
    if (!err) {
      console.log('Inscrito no tópico teste');
    } else {
      console.error('Erro ao se inscrever no tópico:', err);
    }
  });
});

client.on('message', function (topic, message) {
  minhaVariavel = message.toString();
  console.log('Valor do tópico teste recebido:', minhaVariavel);
});

// Criar um servidor HTTP local
const server = http.createServer((req, res) => {
  // Adicionar cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ minhaVariavel }));
});

server.listen(3000, () => {
  console.log('Servidor HTTP rodando na porta 3000');
});
