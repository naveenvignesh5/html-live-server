import { ExtensionContext, window } from 'vscode';

import * as path from 'path';

// libs
import Server from './lib/server';

// constants
import { PORT, IP } from './constants';

class App {
    server: any;
    context: any;
    isLive: Boolean = false;

    constructor(context: ExtensionContext) {
        this.context = context;

        this.initialiseServer(this.getFileSrc());
    }

    getFileSrc(): string {
        let src: string = '';

        if (window.activeTextEditor) {
            src = window.activeTextEditor.document.uri.fsPath;
        }

        return src;
    }

    initialiseServer(filePath: string) {
        // server config
        const _serverConfig = {
            host: IP,
            port: PORT,
            root: path.dirname(filePath),
            file: path.basename(filePath), // thing to updated
        };

        this.server = new Server(_serverConfig);
    }   

    toggleLive() {
        this.isLive = !this.isLive;
    }

    goLive() {
        this.toggleLive();

        if(this.isLive) {
            this.server.startServer();
        }
    }

    stopLive() {
        this.server.stopServer();
    }
}

export default App;
