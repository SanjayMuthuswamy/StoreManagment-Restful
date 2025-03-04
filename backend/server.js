const express = require("express");
const cors = require("cors");
const router = require("./routes/storeRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server is Running @${PORT}`);
});
