/**
 * Vercel Serverless Function Entry Point for Rank-Holder
 * Routes all serverless invocations into the Express application.
 */
const app = require("../server.js");

module.exports = (req, res) => {
    // Vercel rewrite sets x-matched-path or original path
    if (req.headers["x-matched-path"]) {
        req.url = req.headers["x-matched-path"];
    }
    return app(req, res);
};
