import axios from "axios";

const LOG_API = "http://20.244.56.144/evaluation-service/logs";

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
