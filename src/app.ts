import { window, ExtensionContext } from "vscode";

// libs
import Server from "./lib/server";
import Util from "./lib/Util";

// ui
import StatusBar from "./statusbar";

class App {
  ctx: ExtensionContext;
  server: Server;
  file: string = "";

  constructor(context: ExtensionContext) {
    this.ctx = context;
    this.server = new Server(this.ctx, this.file);

    StatusBar.init(this.ctx);
  }

  private resolveFile(filePath?: string) {
    let _filePath: string = filePath || "";

    if (!_filePath) {
      _filePath = window.activeTextEditor
        ? window.activeTextEditor.document.fileName
        : "";
    }

    return _filePath;
  }

  private onStopLive() {
    window.showInformationMessage("Stopped Preview Server");
  }

  goLive(file?: string) {
    let _file: string = file || "";

    _file = this.resolveFile(file);

    if (!_file || !Util.isHTMLFile(_file)) {
      window.showErrorMessage("File type not supported");
      return;
    }

    this.server.startServer(this.onStopLive, _file);

    StatusBar.toggleStatusBar();
    window.showInformationMessage("Started Preview Server");
  }

  stopLive() {
    this.server.stopServer(this.onStopLive);

    StatusBar.toggleStatusBar();
    window.showInformationMessage("Stopped Preview Server");
  }
}

export default App;
