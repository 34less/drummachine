const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const presetHandler = require('./presetHandler');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address =  '0.0.0.0';
 



// CORS request middleware
app.use(cors());

// Logging Middleware
app.use(morgan('dev'));

// Body-parsing middleware
app.use(bodyParser.json());

app.use(express.static('public'));

const presets = require('./presets');

app.get('/presets', (req, res, next) => {
  res.send(presets);
});


app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle presets requests
app.use('/presets/:id', (req, res, next) => {
  let index = Number(req.params.id);
  let presetArray = req.body;
  let isValidPreset = presetArray.length === 4
  && presetArray.every((singleRow) => {
    return singleRow.length === 16
    && singleRow.every((singleGridElement) => {
      return singleGridElement === true || singleGridElement === false;
    });
  });
  if (app.method === 'PUT' && !isValidPreset) {
    res.status(400).send('Bad Request, send a preset array!');
  } else {
    let method = req.method;
    let [status, preset] = presetHandler(method, index, presetArray);
    res.status(status).send(preset);
  }
});

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});

// Hooks to handle saving presets on app exit
process.stdin.resume();
const exitHandler = (options, err) => {
  if (err) {
    console.log(err.stack);
  }
  if (options.exit) {
    const fs = require('fs');
    const presets = require('./presets');
    const savedPresets = {data: presets};
    fs.writeFileSync('presets.json', JSON.stringify(savedPresets));
    process.exit();
  };
};

// Catches Ctrl+C event
process.on('SIGINT', exitHandler.bind(null, {exit: true}));

// Catches Uncaught Exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit: true}));
