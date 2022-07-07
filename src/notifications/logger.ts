import { Console } from "console";
import * as fs from "fs";

export const logger = new Console({
  stdout: fs.createWriteStream("notifications.log"),
});
