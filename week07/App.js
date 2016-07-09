'use strict'

const http = require('http')

module.exports = class {

  constructor() {
    this.middlewares = []
  }
  
  start(port, onServerStart) {
    http.createServer((req, res) => {
      this.middlewares.forEach(middleware => middleware(req, res))
    }).listen(port)
    onServerStart()
  }

  use(middleware) {
    this.middlewares.push(middleware)
  }

}
