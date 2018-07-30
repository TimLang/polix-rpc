'use strict';

const protocol = require('./protocol.js');

class Server {

  constructor () {
    this.server = protocol.create();
  }

  addKiritoService (service, methods) {
    const serviceKeys = Object.getOwnPropertyNames(service);
    const methodKeys = Object.getOwnPropertyNames(methods);
    const events = {};
    serviceKeys.some(method => {
      let idx = -1;
      if ((idx = methodKeys.indexOf(method)) !== -1) {
        events[method] = {
          cb: methods[method],
          param: service[method].param
        };
        delete methodKeys.splice(idx, 1);
      }
    });
    if (Object.keys(events).length > 0) {
      this.server.addEvent(events);
    }
  }

  listen (port) {
    this.server.listen(port);
  }

}

module.exports = Server;