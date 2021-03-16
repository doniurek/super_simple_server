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
  let url = new URL(request.url, `http://${request.headers.host}`);

  console.log(
    "New request: "         +
    protocol(request) + " " +
    request.method    + " " +
    request.headers.host    +
    url.pathname            +
    "\n"                    +
    "Query params: "        +
    urlToJSON(url)
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

function urlToJSON(url) {
  const reducer = function(accumulator, pair) {
    let [key, value] = pair.split("=");
    if (key !== "") {
      accumulator[key] = decodeURIComponent(value || "");
    }
    return accumulator;
  };

  let result = url.search.slice(1).split("&").reduce(reducer, {});

  return JSON.stringify(result, null, 2);
};

function respond(response) {
  const data = {};
  const json = JSON.stringify(data);

  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(json);
};
