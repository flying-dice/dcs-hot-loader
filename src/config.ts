import { LogLevel, Logger } from "@flying-dice/tslua-common";

Logger.level = LogLevel.INFO;
Logger.transports = {
  trace: (message) => log.info(message),
  debug: (message) => log.info(message),
  info: (message) => log.info(message),
  warn: (message) => log.warning(message, true),
  error: (message) => log.error(message, true),
};

export const config = {
  bindAddress: "127.0.0.1",
  port: 51070,
};
