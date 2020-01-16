import { ExtensionContext, window } from "vscode";

import * as path from "path";

// libs
import Server from "./lib/server";

// constants
import { PORT, IP } from "./constants";

class App {
  server: any;
  serverConfig: any;
  context: any;
  isLive: Boolean = false;

  constructor(context: ExtensionContext) {
    this.context = context;
  }

  initialiseServer(_filePath?: string) {
    // server config
    let filePath = _filePath ? _filePath : window.activeTextEditor?.document.fileName;

    if (!filePath) {
        window.showInformationMessage('No document selected');
        return;
    }

    this.serverConfig = {
      host: IP,
      port: PORT,
      root: path.dirname(filePath),
      file: path.basename(filePath) // thing to updated
    };

    this.server = new Server(this.serverConfig);
  }

  toggleLive() {
    this.isLive = !this.isLive;
  }

  goLive(filePath?: string) {
    if (filePath) {
      this.initialiseServer(filePath);
    }

    this.toggleLive();

    if (this.isLive) {
      this.server.startServer();
      window.showInformationMessage("Started Preview Server");
    }
  }

  stopLive() {
    this.server.stopServer();
    window.showInformationMessage("Stopped Preview Server");
  }
}

export default App;
