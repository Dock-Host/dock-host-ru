# Project Structure

This guide shows how to organize a repository so Dock-Host can detect your Dockerfile and deploy the app without extra setup.

## Base project structure

```text
Dock-Host/
│
├── app/                  # Main application code
│   ├── index.js          # Entry point for a Node.js app
│   ├── app.py            # Entry point for a Python app
│   └── ...
│
├── docker/               # Optional Docker-specific folder
│   └── Dockerfile
│
├── public/               # Static assets such as HTML, CSS, and JS
│   ├── index.html
│   └── ...
│
├── config/               # Configuration files
│   ├── nginx.conf
│   └── ...
│
├── .env                  # Environment variables
├── .gitignore
├── README.md
│
├── Dockerfile            # Primary Dockerfile, priority #1
├── dock-host.json        # CLI config generated automatically
│
├── package.json          # Node.js dependencies
├── requirements.txt      # Python dependencies
│
└── scripts/              # Helper scripts
    └── start.sh
```

This layout is useful when you want to keep source code, configuration, scripts, and static assets clearly separated.

## Minimal structure for a quick start

If you want the simplest possible setup, keep the repository flat:

```text
Dock-Host/
│
├── Dockerfile
├── index.js   # or app.py
├── package.json   # or requirements.txt
└── .env
```

This is the recommended starting point for simple projects and is especially convenient when deploying directly from GitHub.

## Important notes

- Your Dockerfile should be in the repository root or in `./docker/Dockerfile`.
- Make sure your Dockerfile exposes the correct port with `EXPOSE`, for example `3000` or `8000`.
- Make sure your application listens on `0.0.0.0`.
- Do not commit `.env` to Git; add it to `.gitignore`.

## Node.js example layout

```text
Dock-Host/
│
├── Dockerfile
├── app/
│   └── index.js
├── package.json
└── .env
```

### Example `app/index.js`

A runnable sample is available at [`templates/node-app/app/index.js`](templates/node-app/app/index.js).

```js
const http = require('http');

const host = '0.0.0.0';
const port = Number(process.env.PORT || 3000);

const requestListener = (_req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ app: 'dock-host-node-example', status: 'ok' }));
};

http.createServer(requestListener).listen(port, host);
```

## Python example layout

```text
Dock-Host/
│
├── Dockerfile
├── app/
│   └── app.py
├── requirements.txt
└── .env
```

### Example `app/app.py`

A runnable sample is available at [`templates/python-app/app/app.py`](templates/python-app/app/app.py).

```python
from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.get('/')
def home():
    return jsonify(app='dock-host-python-example', status='ok')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', '8000')))
```

## Recommendation for GitHub deployments

If you deploy through GitHub, keep the project structure as simple as possible.

Dock-Host automatically looks for Dockerfiles in this order:

1. `./Dockerfile`
2. `./docker/Dockerfile`

If you follow one of the structures above, Dock-Host can usually detect the build source without any extra configuration.
