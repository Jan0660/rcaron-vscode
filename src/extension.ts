/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
// tslint:disable
"use strict";

import * as path from "path";

import { workspace, Disposable, ExtensionContext, l10n } from "vscode";
import {
    LanguageClient,
    LanguageClientOptions,
    SettingMonitor,
    ServerOptions,
    TransportKind,
    InitializeParams,
    StreamInfo,
    Trace
    //createServerPipeTransport,
} from "vscode-languageclient/node";
import { createClientPipeTransport } from "vscode-jsonrpc/node";
import { createConnection } from "net";

export async function activate(context: ExtensionContext) {
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    let serverPath = workspace.getConfiguration('rcaron', workspace.workspaceFolders[0].uri).get<string>('languageServerPath');
    if (serverPath == null)
        return;
    let serverOptions: ServerOptions = serverPath.endsWith('.dll') ? {
        run: {
            command: "dotnet",
            args: [serverPath],
            transport: TransportKind.pipe,
        },
        debug: {
            command: "dotnet",
            args: [serverPath],
            transport: TransportKind.pipe,
        },
    } : { run: { command: serverPath, transport: TransportKind.pipe }, debug: { command: serverPath, transport: TransportKind.pipe } };
    // let time = 100;
    // let serverOptions = async () => {
    //     await new Promise((r) => setTimeout(r, time));
    //     time = 10000;
    //     const [reader, writer] = createServerPipeTransport("\\\\.\\pipe\\" + "samplepipe");
    //     return {
    //         reader,
    //         writer,
    //     };
    // };

    // Options to control the language client
    let clientOptions: LanguageClientOptions = {
        // Register the server for plain text documents
        documentSelector: [
            {
                pattern: "**/*.rcaron",
            },
        ],
        progressOnInitialization: true,
        synchronize: {
            // Synchronize the setting section 'languageServerExample' to the server
            configurationSection: "rcaron",
            fileEvents: workspace.createFileSystemWatcher("**/*.rcaron"),

        },
    };

    // Create the language client and start the client.
    const client = new LanguageClient("rcaron.languageServer", l10n.t("RCaron Language Server"), serverOptions, clientOptions);
    client.setTrace(Trace.Verbose);
    await client.start();

    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(client);
}
