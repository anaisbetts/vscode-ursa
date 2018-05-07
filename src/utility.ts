import * as vscode from 'vscode';
import * as fs from 'fs';

function findNotesDirectories() {
  const toReturn: { name: string, path: string }[] = [];

  for (let folder of vscode.workspace.workspaceFolders || []) {
    let path = vscode.workspace.getConfiguration('ursa', folder.uri).get<string>('notesRootPath');

    if (!path) continue;
    if (folder.uri.scheme !== 'file') continue;

    path = path.replace(/^\.[\\\/]/, folder.uri.fsPath + "/");
    if (!fs.existsSync(path)) {
      console.log(`Configuration specified ${path} as a notes directory but it doesn't exist!`);
      continue;
    }

    toReturn.push({ name: folder.name, path });
  }

  /* NB: this doesn't actually work yet
  const globalNotes = vscode.workspace.getConfiguration('ursa').get<string>('notesRootPath');
  if (globalNotes) {
    if (fs.existsSync(globalNotes)) {
      toReturn.push({ name: "Global", path: globalNotes });
    } else {
      console.log(`Configuration specified ${globalNotes} as a notes directory but it doesn't exist!`);
    }
  }
  */

  return toReturn;
}

