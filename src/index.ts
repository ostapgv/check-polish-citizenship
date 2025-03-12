import { checkCitizenship } from './utils/checkCitizenship';

// Run checkCitizenship immediately on startup
checkCitizenship();

// Schedule the checkCitizenship function to run every 10 minutes (600,000 milliseconds)
const interval = setInterval(checkCitizenship, 10 * 60 * 1000);

// Listen for termination signals and clear the interval on termination
const shutdown = () => {
  clearInterval(interval);
  console.log('Script is terminating. Interval cleared.');
  process.exit();
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
