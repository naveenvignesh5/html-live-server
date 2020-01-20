import { workspace, Uri } from "vscode";

class WorkspaceUtil {
  static verifyWorkspace(path: Uri) {
    return workspace.getWorkspaceFolder(path);
  }

  public static async workspaceHasHTMLFiles(): Promise<Boolean> {
    let _hasHTMLFiles: Boolean = false;

    try {
      const files = await workspace.findFiles('**/*.html');
      _hasHTMLFiles = files && files.length > 0;
    } catch (err) {
      console.log(err);
    }

    return _hasHTMLFiles;
  }
}

export default WorkspaceUtil;
