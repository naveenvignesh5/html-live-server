import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

function getHTMLContent(context: vscode.ExtensionContext): string {
  let htmlText: string = "";

  try {
    htmlText = fs.readFileSync(
      path.join(context.extensionPath, "src", "default.html"),
      "utf-8"
    );
  } catch (err) {
    console.log(err);
    vscode.window.showErrorMessage("Unable to read file");
  }

  return htmlText;
}

export function activate(context: vscode.ExtensionContext) {
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  context.subscriptions.push(
    vscode.commands.registerCommand("server.start", () => {
      currentPanel = vscode.window.createWebviewPanel(
        "main",
        "Preview",
        vscode.ViewColumn.One,
        {}
      );
      currentPanel.webview.html = getHTMLContent(context);
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
