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
    const url = new URL(request.url, `http://${request.headers.host}`);

    newRequestLog(request, body, url);
    route(request, response, url);
  });
};

function route(request, response, url) {
  const routerPath = ROUTER[url.pathname.slice(1)]
  if (!routerPath)
    return notFound(response);

  const handler = routerPath[request.method]
  if (!handler)
    return notFound(response);

  handler(request, response);
};

function notFound(response) {
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.end();
};

function newRequestLog(request, body, url) {
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
