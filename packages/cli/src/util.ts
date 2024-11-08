import { Logger } from "tslog";

export const logger = new Logger({
  name: "CLI",
  prettyLogTemplate:
    "{{dateIsoStr}} {{logLevelName}} {{name}} {{fileNameWithLine}}\t",
});

logger.settings.minLevel = 99;
