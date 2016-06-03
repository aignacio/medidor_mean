var IPv4Broker  = '127.0.0.1';
var mongoCon    = require('./mongo');
var voltage     = require('./public/app/models/voltage');
var current     = require('./public/app/models/current');
var power       = require('./public/app/models/power');
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

  switch (topic[1]) {
    case "current":
      var Current = new current();

      Current.value = message[0];

      Current.save(function (error) {
        if (error)
            throw error;
      });
      break;
    case "voltage":
      var Voltage = new voltage();

      Voltage.value = message[0];

      Voltage.save(function (error) {
        if (error)
            throw error;
      });
      break;
    case "power":
      var Power = new power();

      Power.value = message[0];

      Power.save(function (error) {
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
  server.subscribe('medidor/+');
});
