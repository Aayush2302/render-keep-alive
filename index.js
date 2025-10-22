import express from "express";
import cron from "node-cron";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

const PING_URLS = [
  "https://active-industries.co.in/",
  "https://active-yoc6.onrender.com/",
  "https://active-yoc6.onrender.com/api/view/productsall"
];

const pingAllServers = async () => {
  console.log("🚀 Pinging servers at", new Date().toLocaleString());
  for (const url of PING_URLS) {
    try {
      await axios.get(url);
      console.log(`✅ Successfully pinged: ${url}`);
    } catch (err) {
      console.error(`❌ Failed to ping ${url}:`, err.message);
    }
  }
  console.log("--------------------------------------------------");
};

// Run immediately
pingAllServers();

// Schedule every 5 minutes
cron.schedule("*/5 * * * *", pingAllServers);

// Add simple route for Render’s health check
app.get("/", (req, res) => {
  res.send("Keep-alive cron service running 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
