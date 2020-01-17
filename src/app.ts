import { window } from "vscode";

// libs
import Server from "./lib/server";

class App {
  server: Server;
  file: string = '';

  constructor(filePath?: string) {
    this.file = this.getFile(filePath);
    this.server = new Server(this.file);
  }

  getFile(filePath?: string) {
    let _filePath:string = filePath || '';

    if (!_filePath) { // no uri passed
      _filePath = window.activeTextEditor?.document.fileName || '';
    }

    return _filePath;
  }

  goLive(file?: string) {
    this.server.startServer(file);
    window.showInformationMessage("Started Preview Server");
  }

  stopLive() {
    this.server.stopServer();
    window.showInformationMessage("Stopped Preview Server");
  }
}

export default App;
