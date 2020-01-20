import {
  StatusBarItem,
  StatusBarAlignment,
  window,
  ExtensionContext
} from "vscode";

import { COMMANDS, STORAGE_KEY } from "./constants";

class StatusBar {
  private static _myStatusBar: StatusBarItem;
  private static ctx: ExtensionContext;

  private static get myStatusBar() {
    if (!StatusBar._myStatusBar) {
      StatusBar._myStatusBar = window.createStatusBarItem(
        StatusBarAlignment.Right,
        100
      );

      this.myStatusBar.show();
    }

    return StatusBar._myStatusBar;
  }

  private static showStart() {
    StatusBar.myStatusBar.text = "Start";
    StatusBar.myStatusBar.color = "green";
    StatusBar.myStatusBar.command = COMMANDS.start;
  }

  private static showStop() {
    StatusBar.myStatusBar.text = "Stop";
    StatusBar.myStatusBar.color = "red";
    StatusBar.myStatusBar.command = COMMANDS.stop;
  }

  public static init(ctx: ExtensionContext) {
    StatusBar.ctx = ctx;
    StatusBar.showStop();
  }

  public static toggleStatusBar() {
    const isLive: Boolean =
      StatusBar.ctx.workspaceState.get(STORAGE_KEY) || false;

    if (!isLive) {
      StatusBar.showStart();
      return;
    }

    StatusBar.showStop();
  }

  public static kill() {
    StatusBar.myStatusBar.dispose();
  }
}

export default StatusBar;
