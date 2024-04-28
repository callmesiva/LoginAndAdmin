const express = require("express");
const bodyParser = require("body-parser");
const db = require("./dbConfig");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const cors = require("cors");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:1234",
  methods: "GET, POST, PUT",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization, jwt",
  exposedHeaders: "Content-Range, X-Content-Range",
};
app.use(cors(corsOptions));

const auth = require("./SRC/route/AuthRoute");

app.use("/", auth);

//Global error handler
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
