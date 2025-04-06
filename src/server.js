import express from "express";
import endpoints from "./routes/endpoints.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", endpoints);

app.listen(3000, () => {
    console.log("Server is running on port : 3000");
});
