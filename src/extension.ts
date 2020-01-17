import { ExtensionContext, Uri, commands } from "vscode";
import App from "./app";

export function activate(context: ExtensionContext) {
  const app = new App();

  context.subscriptions.push(
    commands.registerCommand("server.start", (uri?: Uri) => {
      app.goLive(uri?.fsPath);
    }),
    commands.registerCommand("server.stop", () => {
      app.stopLive();
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
