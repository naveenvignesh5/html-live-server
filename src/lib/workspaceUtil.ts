import { workspace, Uri, window } from "vscode";

class WorkspaceUtil {
  static verifyWorkspace(path: Uri) {
    return workspace.getWorkspaceFolder(path);
  }

  public static async workspaceHasHTMLFiles(): Promise<Boolean> {
    let _hasHTMLFiles: Boolean = false;

    try {
      const files = await workspace.findFiles("**/*.html");
      _hasHTMLFiles = files && files.length > 0;
    } catch (err) {
      console.log(err);
    }

    return _hasHTMLFiles;
  }

  public static isWorkspaceValid(): Boolean {
    if (!workspace.workspaceFolders) {
      window.showInformationMessage("Open a folder or workspace. File -> Open Folder");
      return false;
    }

    if (!workspace.workspaceFolders.length) {
      window.showInformationMessage("You've not added any folder in the workspace");
      return false;
    }

    return true;
  }
}

export default WorkspaceUtil;
