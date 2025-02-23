const express = require("express");
const MetaApi = require("metaapi.cloud-sdk").default;
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const apiKey = process.env.METAAPI_KEY;
const accountId = process.env.MT5_ACCOUNT_ID;
const metaApi = new MetaApi(apiKey);

async function connectAndTrade() {
  try {
    console.log("Connecting to MetaApi...");
    const account = await metaApi.metatraderAccountApi.getAccount(accountId);
    await account.deploy();
    await account.waitConnected();
    const connection = account.getStreamingConnection();
    await connection.connect();
    await connection.waitSynchronized();
    console.log("Connected to MT5");
    return connection;
  } catch (error) {
    console.error("Error connecting to MT5:", error);
  }
}

app.post("/trade", async (req, res) => {
  try {
    const { symbol, lotSize, stopLoss, strategy } = req.body;
    const connection = await connectAndTrade();
    if (!connection) return res.status(500).json({ error: "Connection failed" });

    const trade = await connection.createMarketOrder(
      symbol,
      "BUY",
      lotSize,
      stopLoss,
      0,
      "Trading via GETABAG Bot"
    );
    
    res.json({ success: true, trade });
  } catch (error) {
    console.error("Trade error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`GETABAG Backend running on port ${PORT}`);
});
