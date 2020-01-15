const liveServer = require("live-server");

class Server {
  config: object = {};

  constructor(config: object) {
    this.config = config;
  }

  startServer() {
    liveServer.start(this.config);
  }

  stopServer() {
    liveServer.shutdown();
  }
}

export default Server;
