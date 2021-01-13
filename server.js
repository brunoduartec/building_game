const express = require("express");
const app = express();
const env = require("./env.json")

app.use(express.static("public"));


app.get("/", (request, response) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  response.sendFile(__dirname + "/views/school.html");
});


const listener = app.listen(env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

