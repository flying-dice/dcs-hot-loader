import { HttpStatus } from "@flying-dice/tslua-http";
import { Application } from "@flying-dice/tslua-http-api";
import { config } from "./config";

export const app = new Application(config.bindAddress, config.port);

app.useGlobalErrorHandler((err, req, res) => {
  log.error(`Error handling request: ${err}`);
  res
    .status((err as any).status || HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ error: `${err}` });
});
