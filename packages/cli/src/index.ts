#!/usr/bin/env bun

import { $ } from "bun";
import { FileSystem } from "./filesystem";
import { LeetcodeClient } from "./leetcodeclient";
import { GraphQlClient } from "./leetcodeclient/client";
import { logger } from "./util";

const log = logger.getSubLogger({ name: "Main" });

export class Cli {
  constructor(
    private fileSystem: FileSystem,
    private leetcodeClient: LeetcodeClient,
  ) {}

  async run(title: string) {
    const question = await this.leetcodeClient.getQuestion(title);
    const problemWorkspace =
      await this.fileSystem.createProblemWorkspace(question);
    await problemWorkspace.writeSourceFileContents();
    await problemWorkspace.writeTestFileContents();
    await $`code ${problemWorkspace.srcFile}`;
    await $`code ${problemWorkspace.testFile}`;
  }
}

async function main() {
  logger.settings.minLevel = 0;
  log.info("Starting...");
  const title = Bun.argv[2];
  const fileSystem = await FileSystem.initialize("./");
  const client = new GraphQlClient();
  const lcClient = new LeetcodeClient(client);
  const cli = new Cli(fileSystem, lcClient);
  await cli.run(title);
  log.info("Done!");
}

await main();
