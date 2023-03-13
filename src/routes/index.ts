/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import url from "url";
import express, { RequestHandler } from "express";
const router = express.Router();
import rateLimit from "express-rate-limit";
import needle from "needle";
import apicache from "apicache";
import EnvVars from "@src/declarations/major/EnvVars";

const { API_KEY } = EnvVars;
const Limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
});
const cache = apicache.middleware;

const onlyStatus200: RequestHandler = (req, res) => res.statusCode === 200;

const cacheSuccesses = cache("1 day", onlyStatus200);
router.get("/", cacheSuccesses,Limiter, async (req, res) => {
    try {
        const params = new url.URLSearchParams({
            apiKey: API_KEY,
            ...req.query,
        });
        const respond = await needle(
            "get",
            `https://geo.ipify.org/api/v2/country,city?${params}`
        );
        res.json(respond.body);
    } catch (error) {
        res.status(500).json({ error });
    }
});
export default router;
