import cron from "node-cron";
import axios from "axios";

const PING_URL = "https://active-industries.co.in/";

const pingServer = async () => {
  try {
    await axios.get(PING_URL);
    console.log("✅ Render server pinged successfully at", new Date().toLocaleString());
  } catch (err) {
    console.error("❌ Ping failed:", err.message);
  }
};

// Run immediately once
pingServer();

// Run every 5 minutes
cron.schedule("*/5 * * * *", pingServer);
