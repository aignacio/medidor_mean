var IPv4Broker  = '192.168.0.100';
var mongoCon    = require('./mongo');
var voltage     = require('./public/app/models/voltage');
var current     = require('./public/app/models/current');
var power       = require('./public/app/models/power');
var relay       = require('./public/app/models/relay');

var mqtt        = require('mqtt');
var server      = mqtt.connect('mqtt:'+IPv4Broker);
var sleep       = require('sleep');
var colors      = require('colors/safe');

colors.setTheme({
  dimmer: 'magenta',
  current: 'green',
  pir: 'rainbow',
  ldr: 'grey',
  temperature: 'gray',
  ip: 'yellow',
  rssi: 'cyan',
  status: 'white',
  msp: 'gray',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

mongoCon(1);

var reconMQTT = function(){
  console.log(colors.debug('[MQTT] Tentando conectar ao broker IPv4:'+IPv4Broker));
  // server.connect('mqtt:'+IPv4Broker.mqttIPv4);
};

server.on('close', function () {
  console.log(colors.debug('[MQTT] Tentando conector ao broker IPv4:'+IPv4Broker));
  setTimeout(reconMQTT, 30000);
});

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function strToJson(str) {
  eval("var x = " + str + ";");
  return JSON.stringify(x);
}

server.on('message', function (topic, message) {
  var topic = String(topic).split('/');
  var message = String(message).split('-');
  console.log("TOPICO:"+topic);
  console.log("MENSAGEM:"+message);

  switch (topic[1]) {
    case "current":
      var Current = new current();

      console.log("CORRENTE RECEBIDA:"+message[0].trim());
      Current.value = parseFloat(message[0].trim());

      Current.save(function (error) {
        if (error)
            throw error;
      });
      break;
    case "voltage":
      var Voltage = new voltage();

      console.log("TENSÃO RECEBIDA:"+message[0].trim());
      Voltage.value = parseFloat(message[0].trim());

      Voltage.save(function (error) {
        if (error)
            throw error;
      });
      break;
    case "power":
      var Power = new power();

      console.log("POTÊNCIA RECEBIDA:"+message[0].trim());
      Power.value = parseFloat(message[0].trim());

      Power.save(function (error) {
        if (error)
            throw error;
      });
      break;
    case "relay":
      var Relay = new relay();

      console.log("RELÉ RECEBIDA:"+message[0].trim());
      Relay.value = parseFloat(message[0].trim());

      Relay.save(function (error) {
        if (error)
            throw error;
      });
      break;
    default:
      console.log("[MQTT]Opção MQTT Desconhecida");
  }
});

server.on('connect', function () {
  console.log(colors.debug('[MQTT] Conectado ao broker IPv4::'+IPv4Broker));
  server.subscribe('medidor/#');
});
