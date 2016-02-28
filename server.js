'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const fs = require('fs');
const Path = require('path');

const INVENTORY = Path.join(__dirname, 'store/items.json');

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
        console.error(err);
      } else {
        console.log('server running at: ', server.info.uri);
      }
    });
});

function getRouteConfig(description) {
  return {
    tags: ['api'],
    cors: process.env.DEV ? true : false, // only allow cross-origin in dev environment
    description: description || ''
  };
};

// API routes
const routes = [
  {
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: './public',
        index: true
      }
    }
  },
  {
    method: 'GET',
    path: '/api/items',
    config: getRouteConfig('Get all items'),
    handler: getItems
  },
  {
    method: 'POST',
    path: '/api/items',
    config: getRouteConfig('Add item to inventory'),
    handler: addItem
  },
  {
    method: 'POST',
    path: '/api/items/bulk',
    config: getRouteConfig('Add multiple items to inventory in bulk'),
    handler: addMultipleItems
  },
  {
    method: 'DELETE',
    path: '/api/items/{label}',
    config: getRouteConfig('Remove item from inventory'),
    handler: removeItem
  }
];

server.route(routes);

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

function addItem(request, reply) {
  fs.readFile(INVENTORY, (err, data) => {
    if (err) {
      console.error(err);
      return reply(err).code(500);
    }

    let items = JSON.parse(data),
        label = request.payload.label,
        type = request.payload.type,
        expiration = parseInt(request.payload.expiration, 10) || Date.now() + 300000; // 5min

    if (items[label]) {
      return reply('Item by that label is already in inventory').code(409);
    }

    items[label] = { label, type, expiration }

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

function addMultipleItems(request, reply) {
  fs.readFile(INVENTORY, (err, data) => {
    if (err) {
      console.error(err);
      return reply(err).code(500);
    }

    let items = JSON.parse(data);
    let key = Object.keys(request.payload)[0]; // string
    let parsedArray = JSON.parse(key);
    let itemsAdded = [];

    for (let item of parsedArray) {
      if (items[item.label]) continue; // ignore if item label already exists
      items[item.label] = {
        label: item.label,
        type: item.type,
        expiration: item.expiration
      };
      itemsAdded.push(item.label);
    }

    if (!itemsAdded.length) return reply('No items added').code(409);

    fs.writeFile(INVENTORY, JSON.stringify(items, null, 2), (err) => {
      let response = err || {
        statusCode: 201,
        message: `${itemsAdded.length} items added successfully`,
        data: items
      }
      reply(response);
    });
  });
}

function removeItem(request, reply) {
  fs.readFile(INVENTORY, (err, data) => {
    let label = decodeURIComponent(request.params.label);
    if (err) {
      console.error(err);
      return reply(err).code(500);
    }
    if (!label) return reply('No label to remove').code(400)

    let items = JSON.parse(data);
    if (!items[label]) {
      return reply('Item not in inventory').code(404);
    }

    delete items[label];

    fs.writeFile(INVENTORY, JSON.stringify(items, null, 2), (err) => {
      let response = err || {
        statusCode: 200,
        message: 'Item successfully removed',
        data: items
      }
      reply(response);
    });
  });
}
