const http = require('http');

const PORT = 2137;

let app = http.createServer(handleRequest);
console.log("Server is up!");
app.listen(PORT);
console.log("Listening on port " + PORT);
console.log("-------------------------");

function handleRequest(request, response) {
  newRequestLog(request);

  const data = {recipe: "butter the bread"};
  const json = JSON.stringify(data);

  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(json);
};

function newRequestLog(request) {
  console.log(
    "New request: "         +
    protocol(request) + " " +
    request.method    + " " +
    request.headers.host    +
    request.url
  );
};

function protocol(request) {
  switch (request.protocol) {
    case undefined:
      return "http";
    case "https":
      return "https";
    default:
      return "UNSUPPORTED PROTOCOL [" + request.protocol + "]";
  }
};
