'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const fs = require('fs');
const path = require('path');

const INVENTORY = path.join(__dirname, 'store/items.json');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: process.env.PORT || 3000
});

const options = {
  info: {
    'title': 'Inventory API Documentation',
    'version': Pack.version
  }
};

server.register([
  Inert,
  Vision,
  {
    register: HapiSwagger,
    options: options
  }],
  (err) => {
    server.start((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('server running at: ', server.info.uri);
      }
    });
});

// API routes
const routes = [
  {
    method: 'GET',
    path: '/api/items',
    config: {
      tags: ['api'],
      description: 'Get all items'
    },
    handler: getItems
  },
  {
    method: 'POST',
    path: '/api/items',
    config: {
      tags: ['api'],
      description: 'Add item to inventory' // TODO: make this config DRYer?
    },
    handler: addItem
  }
];

server.route(routes);

server.start((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('server running at: ', server.info.uri);
  }
});

function getItems(request, reply) {
  fs.readFile(INVENTORY, (err, data) => {
    let response = err || {
      statusCode: 200,
      message: 'Getting all items',
      data: JSON.parse(data)
    };
    reply(response);
  });
}

function addItem(request, reply) { // TODO: use promises instead of nesting async calls
  fs.readFile(INVENTORY, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var items = JSON.parse(data);
    var newItem = {
      label: encodeURIComponent(request.params.label), // TODO: validate w/ joi, no empty fields
      type: encodeURIComponent(request.params.type),
      expiration: encodeURIComponent(request.params.expiration) || Date.now() + 300000 // 5min
    };
    items.push(newItem);
    fs.writeFile(INVENTORY, JSON.stringify(items, null, 2), (err) => {
      let response = err || {
        statusCode: 201,
        message: 'Item added successfully',
        data: items
      }
      reply(response);
    });
  });
}
