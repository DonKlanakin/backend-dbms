const timer = require("../utils/timer");

const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 500;

const retry = async (queryFn, args = [], retryCount = 0) => {
  try {
    return await queryFn(...args);
  } catch (err) {
      // [TEST RETRY] Inject connection failure
      err.code = "08006";
      // [TEST RETRY]
      const connectionErrors = [
          "ECONNRESET", "ECONNREFUSED", "ETIMEDOUT",
          "57P01", // Admin Shutdown
          "08006", // Connection failure
          "08003", // Connection does not exist
      ];
      const errorCode = err.code || err.sqlState || '';
      const isConnectionIssue = connectionErrors.includes(errorCode);
      
      if (isConnectionIssue && retryCount < MAX_RETRIES) {
          const delay = INITIAL_DELAY_MS * Math.pow(2, retryCount);
          console.warn(`[DB RETRY] Attempt ${retryCount + 1} after error: ${errorCode}. Retrying in ${delay}ms...`);
          await timer.processDelay(delay);
          return retry(queryFn, args, retryCount + 1);
      }

      throw err;
    }
};

module.exports = retry;
