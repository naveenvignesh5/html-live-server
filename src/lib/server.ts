import { IP, PORT } from "./../constants";
import { window, Uri } from "vscode";
import { dirname, basename } from "path";
const liveServer = require("live-server");

class Server {
  config: object = {};
  isLive: Boolean = false;

  constructor(_filePath: string) {
    this.initialiseServer(_filePath);
  }

  initialiseServer(_filePath: string) {

    const _serverConfig = {
      host: IP,
      port: PORT,
      root: dirname(_filePath),
      file: basename(_filePath) // thing to updated
    };

    this.config = _serverConfig;
  }

  updateFile(file: string) {
    this.config = {
      ...this.config,
      root: dirname(file),
      file: basename(file),
    };
  }

  startServer(filePath?: string) {
    if (filePath) {
      this.updateFile(filePath);
      this.stopServer();
    }

    if (this.isLive) {
      this.stopServer();
    }

    liveServer.start(this.config);
    this.isLive = true;
  }

  stopServer() {
    this.isLive = false;
    liveServer.shutdown();
  }
}

export default Server;
