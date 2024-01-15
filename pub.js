const redis = require("redis");
const express = require("express");
const app = express();

let publisher = redis.createClient({
  url: "redis://localhost:6379",
});

publisher.on("error", (err) => console.log("Redis error"));
publisher.on("connect", (err) => console.log("Redis connected"));

const connect = async () => {
  await publisher.connect();
};
connect();

app.get("/", (req, res) => {
  res.send({ message: "Publisher active from port 3001 " });
});

app.get("/publish", async (req, res) => {
  const id = Math.floor(Math.random() * 10);
  const data = { id, message: `message - ${id}` };
  await publisher.publish("message", JSON.stringify(data));

  res.send({
    message: "data published",
  });
});

app.listen(3002, () => {
  console.log("Publisher server start on 3002");
});
