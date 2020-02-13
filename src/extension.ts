// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { commands } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.agendaItemDone', function () {
		// Get the active text editor
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;

			// get target agenda item
			let currentLine = document.lineAt(editor.selection.active);
			let lineText = currentLine.text;
			let startIndex = lineText.lastIndexOf('(');
			let endIndex = lineText.lastIndexOf(')');
			if (startIndex < 0 || endIndex < 0) { return; }
			let agendaNumber = lineText.substring(startIndex + 1, endIndex);

			// check agenda item
			let text = document.getText();
			startIndex = text.indexOf(agendaNumber + '. [ ]');
			endIndex = startIndex + (agendaNumber + '. [ ]').length;
			if (startIndex < 0 || endIndex < 0) { return; }
			let start = document.positionAt(startIndex);
			let end = document.positionAt(endIndex);
			let range = new vscode.Range(start, end);
			editor.edit(editBuilder => {
				editBuilder.replace(range, agendaNumber + '. [x]');
			});
		}
	});

	context.subscriptions.push(disposable);
}