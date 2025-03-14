"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkCitizenship_1 = require("./utils/checkCitizenship");
// Run checkCitizenship immediately on startup
(0, checkCitizenship_1.checkCitizenship)();
// Schedule the checkCitizenship function to run every 10 minutes (600,000 milliseconds)
const interval = setInterval(checkCitizenship_1.checkCitizenship, 10 * 60 * 1000);
// Listen for termination signals and clear the interval on termination
const shutdown = () => {
    clearInterval(interval);
    console.log('Script is terminating. Interval cleared.');
    process.exit();
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
