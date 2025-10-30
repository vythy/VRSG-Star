require("dotenv").config();

const http = require("http");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose")
const path = require("path");

const api = require("./api");
const auth = require("./auth");

const mongoConnectionURL = process.env.MONGO_SRV;
const databaseName = "Cluster0";

mongoose.set("strictQuery", false);

// connect to mongodb
mongoose
  .connect(mongoConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

// create a new express server
const app = express();

// allow us to process POST requests
app.use(express.json());

// set up a session to persist login data across requests
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// check if the user is logged in and populate req.user
app.use(auth.populateCurrentUser);

app.use("/api", api);

// load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

// for all other routes, render index.html and let react router handle it
app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"), (err) => {
    if (err) {
      console.log("Error sending client/dist/index.html:", err.status || 500);
      res.status(err.status || 500).send("Error sending client/dist/index.html - have you run `npm run build`?");
    }
  });
});

// any server errors cause this function to run
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    // 500 means Internal Server Error
    console.log("The server errored when processing a request!");
    console.log(err);
  }

  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});

// hardcode port to 3000 for now
const port = 3000;
const server = http.Server(app);

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
