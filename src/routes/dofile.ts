import { app } from "../app";
import { DofileDto } from "../dtos/dofile.dto";
import { variables } from "../services/variables";
import { HttpError } from "@flying-dice/tslua-http-api";
import { HttpStatus } from "@flying-dice/tslua-http";
import { Logger } from "@flying-dice/tslua-common";
import { missionService } from "../services/mission";

const logger = new Logger("DofileRouter");

app.options("/dofile", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
  res.status(HttpStatus.NO_CONTENT).send("");
});

app.post("/dofile", (req, res) => {
  const { path, target } = req.getBodyOrThrow<DofileDto>();

  let p = path;

  Object.keys(variables).forEach((variable) => {
    const variableValue = variables[variable];

    logger.trace(`Replacing {${variable}} with ${variableValue}`);
    const [res] = string.gsub(p, `{${variable}}`, variableValue);
    logger.trace(`Result: ${res}`);
    p = res;
  });

  const [scriptPath] = string.gsub(`${p}`, "\\", "/");

  logger.info(`Executing dofile ${scriptPath} in ${target}`);

  switch (target) {
    case "gui":
      dofile(scriptPath);
      break;
    case "mission":
      if (!missionService.isMissionRunning()) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Mission not running, cannot execute dofile in mission",
        );
      }
      net.dostring_in("mission", `a_do_script("dofile('${scriptPath}')")`);
      break;
    default:
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        `Unknown target: ${target} valid targets are: gui, mission`,
      );
  }

  logger.info(`dofile ${scriptPath} executed in ${target}`);

  res.json({
    status: "OK",
    path: scriptPath,
    target: target,
  });
});
