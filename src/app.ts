import { window } from "vscode";

// libs
import Server from "./lib/server";
import Util from "./lib/Util";

class App {
  server: Server;
  file: string = "";

  constructor(filePath?: string) {
    this.file = this.resolveFile(filePath);
    this.server = new Server(this.file);
  }

  resolveFile(filePath?: string) {
    let _filePath: string = filePath || "";

    if (!_filePath) {
      _filePath = window.activeTextEditor
        ? window.activeTextEditor.document.fileName
        : "";
    }

    return _filePath;
  }

  goLive(file?: string) {
    let _file: string = file || "";

    _file = this.resolveFile(file);

    if (!_file || !Util.isHTMLFile(_file)) {
      return;
    }

    this.server.startServer(_file);
    window.showInformationMessage("Started Preview Server");
  }

  stopLive() {
    this.server.stopServer();
    window.showInformationMessage("Stopped Preview Server");
  }
}

export default App;
