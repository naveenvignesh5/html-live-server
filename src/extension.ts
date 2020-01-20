import { ExtensionContext, Uri, commands } from "vscode";
import App from "./app";

import { COMMANDS } from "./constants";

export function activate(context: ExtensionContext) {
  const app = new App(context);

  context.subscriptions.push(
    commands.registerCommand(COMMANDS.start, (uri?: Uri) => {
      app.goLive(uri?.fsPath);
    }),
    commands.registerCommand(COMMANDS.stop, () => {
      app.stopLive();
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
