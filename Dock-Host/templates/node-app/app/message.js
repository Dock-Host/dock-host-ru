function buildPayload() {
  return {
    app: 'dock-host-node-example',
    status: 'ok',
    message: 'Hello from Dock-Host!',
  };
}

module.exports = { buildPayload };
