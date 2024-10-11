#!/usr/bin/env bun

import { LeetcodeClient } from "./leetcodeclient";
import { FileSystem } from "./filesystem";
import { GraphQlClient } from "./leetcodeclient/client";

export class Cli {
    constructor(
        private fileSystem: FileSystem,
        private leetcodeClient: LeetcodeClient,
    ) { }

    async run(title: string) {
        const question = await this.leetcodeClient.getQuestion(title);
        const problemWorkspace = await this.fileSystem.createProblemWorkspace(question);
        await problemWorkspace.writeSourceFileContents();
    }
}


async function main() {
    console.log("Starting...");
    const title = Bun.argv[2];
    const fileSystem = await FileSystem.initialize("./");
    const client = new GraphQlClient();
    const lcClient = new LeetcodeClient(client);
    const cli = new Cli(fileSystem, lcClient);
    await cli.run(title);
}


console.log("Starting...");
await main();