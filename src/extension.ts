import * as vscode from "vscode";
import App from './app';

export function activate(context: vscode.ExtensionContext) {
  const app = new App(context);

  context.subscriptions.push(
    vscode.commands.registerCommand("server.start", () => {
      app.goLive();
    }),
    vscode.commands.registerCommand("server.stop", () => {
      app.stopLive();
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
