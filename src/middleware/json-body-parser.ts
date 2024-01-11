import { AppMiddleware } from "@flying-dice/tslua-http-api";
import * as json from "@flying-dice/tslua-rxi-json";
import { Logger } from "@flying-dice/tslua-common";

const logger = new Logger("JsonBodyParser");

export const jsonBodyParser: AppMiddleware = (req, res, next) => {
  logger.debug(`Parsing body: ${req.body}`);
  if (req.body) {
    req.body = json.decode(req.body as string);
  }

  next();
};
