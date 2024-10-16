import { logger } from "./util";

const log = logger.getSubLogger({ name: "Error" });

export class CliError extends Error {
  constructor(message: string) {
    log.error(message);
    super(message);
  }
}
