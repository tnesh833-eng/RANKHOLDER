/**
 * Vercel Serverless Function Entry Point for Rank-Holder
 * Routes all serverless invocations into the Express application.
 */
const app = require("../server.js");

module.exports = (req, res) => {
    return app(req, res);
};
