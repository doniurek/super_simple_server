const http = require('http');

const PORT = 2137;

let app = http.createServer(handleRequest);
console.log("Server is up!");
app.listen(PORT);
console.log("Listening on port " + PORT);
console.log("-----------------------------");

function handleRequest(request, response) {
  let body = "";
  request.on("data", chunk => { body += chunk; });
  request.on("end", () => {
    newRequestLog(request, body);
    respond(response);
  });
};

function newRequestLog(request, body) {
  console.log(
    "New request: "         +
    protocol(request) + " " +
    request.method    + " " +
    request.headers.host    +
    request.url
  );
  if (request.method !== "GET") {
    console.log("Reqest body: " + JSON.stringify(JSON.parse(body), null, 2));
  };
  console.log("-----------------------------");
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

function respond(response) {
  const data = {recipe: "butter the bread"};
  const json = JSON.stringify(data);

  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(json);
};
