import { workspace, ExtensionContext, Uri } from "vscode";

class Workspace {
  context: ExtensionContext;
  
  constructor(context: ExtensionContext) {
    this.context = context;
  }

  verifyWorkspace(path: Uri) {
    return workspace.getWorkspaceFolder(path);
  }
}

export default Workspace;
