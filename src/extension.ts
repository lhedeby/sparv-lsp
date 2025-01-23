import * as vscode from 'vscode';

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {

    const serverOptions: ServerOptions = {
        transport: TransportKind.stdio,
        command: 'sparv',

        args: ['lsp']
    }

    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'sparv' }],
        markdown: {
            isTrusted: true,
            supportHtml: true
        },
        outputChannelName: 'sparv-lsp',
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
        }
    }

    client = new LanguageClient('sparvlsp', 'Sparv lsp', serverOptions, clientOptions);
    client.start();
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
