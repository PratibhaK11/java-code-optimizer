import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('java-code-optimizer.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
