const http = require('http');
const { buildPayload } = require('./message');

const host = '0.0.0.0';
const port = Number(process.env.PORT || 3000);

const requestListener = (_req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(buildPayload()));
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Dock-Host example app listening on http://${host}:${port}`);
});
