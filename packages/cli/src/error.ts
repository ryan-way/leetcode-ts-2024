import { logger } from "./util";

export class CliError extends Error {
  constructor(message: string) {
    logger.error(message);
    super(message);
  }
}
