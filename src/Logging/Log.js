// import axios from "axios";

// const LOG_API = "http://20.244.56.144/evaluation-service/logs";

// export const log = async (stack, level, logPackage, message, token) => {
//   try {
//     const response = await axios.post(
//       LOG_API,
//       { stack, level, package: logPackage, message },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log("Log success:", response.data);
//   } catch (error) {
//     console.error("Log error:", error);
//   }
// };




// src/utils/logger.js
import axios from "axios";

const LOG_API = "http://20.244.56.144/evaluation-service/logs";

/**
 * Send log data to the test server
 * @param {string} stack - "frontend" or "backend"
 * @param {string} level - "debug" | "info" | "warn" | "error" | "fatal"
 * @param {string} logPackage - as per allowed frontend/backend values
 * @param {string} message - Log message
 * @param {string} token - Bearer token
 */
export const log = async (stack, level, logPackage, message, token) => {
  try {
    const res = await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: logPackage,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Logged:", res.data);
  } catch (err) {
    console.error("Logging failed:", err.response?.data || err.message);
  }
};
