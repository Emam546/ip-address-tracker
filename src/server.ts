import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";

import "express-async-errors";
import BaseRouter from "@src/routes";
import logger from "jet-logger";
import EnvVars from "@src/declarations/major/EnvVars";
import HttpStatusCodes from "@src/declarations/major/HttpStatusCodes";
import { NodeEnvs } from "@src/declarations/enums";
import { RouteError } from "@src/declarations/classes";
import cors from "cors";
// **** Init express **** //

const app = express();

// **** Set basic express settings **** //

app.use(express.json());

// Show routes called in console during development
if (EnvVars.nodeEnv === NodeEnvs.Dev) {
    app.use(morgan("dev"));
}

// Security
if (EnvVars.nodeEnv === NodeEnvs.Production) {
    app.use(helmet());
}
if (EnvVars.nodeEnv === NodeEnvs.Dev) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    app.use(cors({ origin: "*" }));
}else if(EnvVars.nodeEnv==NodeEnvs.Production){
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    app.use(cors({ origin: "https://emam546.github.io" }));

}
// **** Add API routes **** //

// Add APIs
app.use("/api", BaseRouter);

// Setup error handler
app.use(
    (
        err: Error,
        _: Request,
        res: Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: NextFunction
    ) => {
        logger.err(err, true);
        let status = HttpStatusCodes.BAD_REQUEST;
        if (err instanceof RouteError) {
            status = err.status;
        }
        return res.status(status).json({ error: err.message });
    }
);

// **** Serve front-end content **** //

// Set views directory (html)
const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

// **** Export default **** //

export default app;
