const http = require('http');

const PORT = 2137;

function handleRequest(req, res) {
  console.log("New request: " + req.method + " " + req.url);

  const data = {recipe: "butter the bread"};
  const json = JSON.stringify(data);

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(json);
};

let app = http.createServer(handleRequest);
console.log("Server is up!");
app.listen(PORT);
console.log("Listening on port " + PORT);
console.log("-------------------------");
