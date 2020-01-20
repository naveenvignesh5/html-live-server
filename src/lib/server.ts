import { ExtensionContext } from 'vscode';
import { dirname, basename } from "path";

import { IP, PORT, STORAGE_KEY } from "./../constants";

const liveServer = require("live-server");

class Server {
  private config: object = {};
  private ctx: ExtensionContext;

  constructor(context: ExtensionContext, _filePath: string) {
    this.initialiseServer(_filePath);
    this.ctx = context;
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

  startServer(cb: Function, filePath?: string) {
    const isLive: Boolean = this.ctx.workspaceState.get(STORAGE_KEY) || false;

    if (filePath) {
      this.updateFile(filePath);
      this.stopServer(cb);
    }

    if (isLive) {
      this.stopServer(cb);
    }

    liveServer.start(this.config);

    this.ctx.workspaceState.update(STORAGE_KEY, true);
  }

  stopServer(cb: Function) {
    this.ctx.workspaceState.update(STORAGE_KEY, false);

    liveServer.shutdown(cb);
  }
}

export default Server;
