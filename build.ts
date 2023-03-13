/**
 * Remove old files, copy front-end ones.
 */

import fs from "fs-extra";
import logger from "jet-logger";
import childProcess from "child_process";

/**
 * Start
 */
(async () => {
    try {
        // Remove current build
        await remove("./dist/");
        // Copy front-end files
        await copy("./src/public", "./dist/public");
        await copy("./src/views", "./dist/views");
        // Copy back-end files
        await exec("tsc --build tsconfig.prod.json", "./");
    } catch (err) {
        logger.err(err);
    }
})();

/**
 * Remove file
 */
async function remove(loc: string): Promise<void> {
    return new Promise((res, rej) => {
        if (!fs.existsSync(loc)) return res();
        return fs.remove(loc, (err) => {
            return !!err ? rej(err) : res();
        });
    });
}

/**
 * Copy file.
 */
async function copy(src: string, dest: string): Promise<void> {
    if (fs.existsSync(src)) await fs.copy(src, dest);
}

/**
 * Do command line command.
 */
function exec(cmd: string, loc: string): Promise<void> {
    return new Promise((res, rej) => {
        return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
            if (!!stdout) {
                logger.info(stdout);
            }
            if (!!stderr) {
                logger.warn(stderr);
            }
            return !!err ? rej(err) : res();
        });
    });
}
