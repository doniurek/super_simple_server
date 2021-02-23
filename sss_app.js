const http = require('http');

function handleRequest(req, res) {
  console.log("New request: " + req.method);

  const data = {recipe: "butter the bread"};
  const json = JSON.stringify(data);

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(json);
};

let app = http.createServer(handleRequest);
app.listen(2137);
