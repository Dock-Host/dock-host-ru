# Dock-Host

## What is Dock-Host?

Dock-Host is a container hosting platform that lets you deploy any Dockerized application in seconds — no server management required.

With Dock-Host you can:

- Deploy apps directly from GitHub or GitLab repositories
- Get automatic HTTPS (SSL) for every container
- Monitor container usage (CPU, RAM, network)
- View real-time logs and debug issues from the dashboard

Dock-Host is designed for developers who want the power of Docker without the overhead of managing infrastructure. Whether you're running a Node.js API, a Python web app, or a full Ubuntu desktop environment — if it runs in Docker, it runs on Dock-Host.

## Creating an Account

1. Go to dock-host.com and click **Sign Up**.
2. Enter your email address and choose a password, or sign up using your GitHub account.
3. Verify your email address via the confirmation link sent to your inbox.
4. Once verified, you'll be taken to your dashboard — your home for managing all deployments.

**Free plan includes:**

- 1 app
- Shared CPU
- 512 MB RAM
- Auto-SSL at no cost

## Connecting GitHub / GitLab

Connecting your Git provider allows Dock-Host to pull your repositories and auto-detect your Dockerfile for deployment.

### GitHub

1. In your dashboard, go to **Settings → Integrations**.
2. Click **Connect GitHub**.
3. You'll be redirected to GitHub to authorize Dock-Host.
4. Select the repositories (or your entire account) you want to grant access to.
5. Click **Authorize** — you'll be redirected back to your dashboard.

### GitLab

1. In your dashboard, go to **Settings → Integrations**.
2. Click **Connect GitLab**.
3. You'll be redirected to GitLab to authorize Dock-Host via OAuth.
4. Approve the requested permissions.
5. Click **Authorize** — you'll be redirected back to your dashboard.

Once connected, your repositories will appear when creating a new deployment.

## First Container Deployment

### Step 1 — Create a new app

From your dashboard, click **New App**.

### Step 2 — Select a repository

Choose the GitHub or GitLab repository that contains your project. Dock-Host will automatically scan for a Dockerfile in the root of the repository.

If no Dockerfile is found, you'll be prompted to add one or use a template.

### Step 3 — Configure your app

| Setting | Description |
| --- | --- |
| App name | A unique name for your deployment |
| Branch | The branch to deploy from (default: `main`) |
| Port | The port your container listens on (for example `3000`, `8080`) |
| Environment variables | Optional key-value pairs passed into the container |

### Step 4 — Deploy

Click **Deploy**. Dock-Host will:

1. Pull your repository
2. Build your Docker image
3. Start your container
4. Issue an SSL certificate and assign a public URL

Deployment typically takes under 60 seconds. Once complete, your app will be live at:

```text
https://your-app-name.dock-host.app
```

### Step 5 — View logs

Navigate to your app's **Logs** tab to see real-time container output and verify everything is running correctly.

## Dockerfile Auto-Detection

When you connect a repository, Dock-Host automatically scans it for a Dockerfile to use as the build source.

### How it works

1. Dock-Host clones your repository at the selected branch.
2. It searches for a Dockerfile starting from the root directory.
3. If found, the file is used immediately — no additional configuration needed.
4. If not found, you'll be prompted to either add a Dockerfile manually or select a starter template.

### Supported locations

Checked in the following order:

| Priority | Path |
| --- | --- |
| 1 | `./Dockerfile` |
| 2 | `./docker/Dockerfile` |
| 3 | Custom path (set manually in app settings) |

### Tips

- Make sure your Dockerfile exposes the correct port using the `EXPOSE` instruction.
- If your project uses Docker Compose, only the Dockerfile is used — Compose files are not supported at this time.
- You can override the detected path at any time in **App Settings → Build**.

## Deploy via GitHub

Deploying from GitHub is the recommended workflow for most projects.

### Initial deployment

1. From your dashboard, click **New App**.
2. Select **GitHub** as the source.
3. Choose a repository from the list of connected repos.
4. Select a branch (default: `main`).
5. Set your app name, port, and any environment variables.
6. Click **Deploy**.

### Auto-deploy on push

Once your app is created, you can enable automatic deployments triggered by new commits:

1. Open your app and go to **Settings → Deploy**.
2. Toggle on **Auto-deploy on push**.
3. Choose the branch to watch (for example `main` or `production`).

From this point on, every push to the selected branch will trigger a new build and deployment automatically.

### Manual redeploy

To trigger a deployment manually at any time:

1. Open your app from the dashboard.
2. Click **Redeploy** in the top-right corner.

Dock-Host will pull the latest commit from the configured branch and rebuild.

## Deploy via CLI

The Dock-Host CLI lets you deploy directly from your terminal without opening the dashboard.

### Installation

```bash
npm install -g dock-host-cli
```

### Authentication

```bash
dock-host login
```

You'll be prompted to enter your API key, which you can find in **Dashboard → Settings → API**.

### Deploying a project

Navigate to your project directory (where your Dockerfile is located) and run:

```bash
dock-host deploy
```

On first run, you'll be guided through a setup wizard to name your app and set the port. These settings are saved in a local `dock-host.json` config file.

### Common CLI commands

| Command | Description |
| --- | --- |
| `dock-host deploy` | Build and deploy the current directory |
| `dock-host logs` | Stream live container logs |
| `dock-host restart` | Restart the running container |
| `dock-host status` | Show current app status and URL |
| `dock-host env set KEY=VALUE` | Set an environment variable |
| `dock-host env list` | List all environment variables |
| `dock-host apps` | List all your deployed apps |

### Example workflow

```bash
# Log in once
dock-host login

# Deploy your app
dock-host deploy

# Check it's running
dock-host status

# Stream logs
dock-host logs
```

## Restarting a Container

Sometimes a container needs to be restarted — for example, after updating environment variables, or to recover from an unexpected crash.

### Via the dashboard

1. Open your app from the dashboard.
2. Click the **Restart** button in the top-right corner.

The container will stop and start again using the current image (no rebuild).

### Via the CLI

```bash
dock-host restart
```

Run this from a directory with a `dock-host.json` config, or pass the app name directly:

```bash
dock-host restart --app your-app-name
```

### Auto-restart on crash

Dock-Host automatically restarts containers that exit unexpectedly. You can configure the restart policy in **App Settings → Advanced**:

| Policy | Behavior |
| --- | --- |
| Always | Restart on any exit (default) |
| On failure | Restart only on non-zero exit codes |
| Never | Do not restart automatically |

## Auto-SSL

Every app deployed on Dock-Host automatically receives a signed SSL certificate — no configuration required.

### How it works

- When your container starts, Dock-Host provisions an SSL certificate via Let's Encrypt.
- Your app is immediately accessible over HTTPS at a `*.dock-host.app` subdomain.
- Certificates are renewed automatically before they expire — you never need to manually renew.

### Custom domains

You can attach your own domain to any app:

1. Open your app and go to **Settings → Domains**.
2. Click **Add Custom Domain** and enter your domain (for example `app.yourdomain.com`).
3. Add the CNAME record shown to your DNS provider.
4. Dock-Host will detect the DNS change and issue an SSL certificate for your custom domain automatically.

SSL is included on all plans, including free.

## Container Monitoring

Dock-Host provides real-time visibility into your container's resource usage directly from the dashboard.

### Metrics available

| Metric | Description |
| --- | --- |
| CPU usage | Percentage of allocated CPU used |
| RAM usage | Memory consumed vs. your plan limit |
| Network I/O | Inbound and outbound traffic |
| Uptime | Time since the container last started |
| Restart count | Number of automatic restarts |

### Accessing monitoring

1. Open your app from the dashboard.
2. Click the **Monitoring** tab.
3. View live metrics or switch to the **History** view for usage over the past 24 hours, 7 days, or 30 days.

### Alerts

Dock-Host sends an email notification when your container reaches 90% of its RAM or CPU limit. You can manage alert preferences in **Settings → Notifications**.

## Usage Limits

Each plan has resource limits applied per container.

| Resource | Free Plan |
| --- | --- |
| Apps | 1 |
| CPU | Shared |
| RAM | 512 MB |
| Storage | 1 GB |
| Bandwidth | 10 GB/month |
| SSL | Included |

### What happens when you hit a limit

- **RAM:** The container is restarted automatically if it exceeds its memory limit.
- **Bandwidth:** Your app will be rate-limited for the remainder of the billing period.
- **Storage:** Builds will fail if the image exceeds the storage cap.

You can monitor current usage in **Dashboard → Usage**.

## Logs & Debugging

Dock-Host gives you access to live and historical logs for every container, making it easy to diagnose issues.

### Live logs

1. Open your app from the dashboard.
2. Click the **Logs** tab.
3. Logs stream in real time as your container produces output.

### Log history

Logs are retained for the last 7 days. Use the date picker in the **Logs** tab to browse historical output.

### Filtering logs

You can filter logs by:

- Severity: `INFO`, `WARN`, `ERROR`
- Keyword: free-text search across log lines
- Time range: from the last 15 minutes up to the last 7 days

### Viewing build logs

Build logs (from the Docker image build step) are separate from runtime logs. To view them:

1. Go to your app's **Deployments** tab.
2. Click on any deployment entry.
3. Select **Build Logs** to see the full Docker build output.

### Debugging common issues

| Symptom | Where to look |
| --- | --- |
| App won't start | Build Logs → check for missing dependencies or build errors |
| App crashes on startup | Runtime Logs → check for missing environment variables |
| App returns 502 | Check that your container is listening on the correct port |
| High memory usage | Monitoring tab → check for memory leaks |

### CLI log streaming

```bash
dock-host logs
```

Add `--tail 100` to see the last 100 lines, or `--follow` to keep streaming:

```bash
dock-host logs --follow
```

## Deploy a Node.js App

### Prerequisites

- A Node.js project with a `package.json`
- A GitHub or GitLab repository (or use the CLI)

### Step 1 — Add a Dockerfile

Create a `Dockerfile` in the root of your project:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

Replace `index.js` with your actual entry point if different.

### Step 2 — Deploy

#### Via GitHub

1. Push your code to GitHub.
2. In Dock-Host, click **New App → GitHub**.
3. Select your repository and branch.
4. Set the port to `3000`.
5. Click **Deploy**.

#### Via CLI

```bash
dock-host deploy
```

### Step 3 — Verify

Once deployed, visit your app URL and check the **Logs** tab to confirm the server started correctly.

## Deploy a Python App

This guide uses Flask, but the same approach works for FastAPI, Django, or any Python web framework.

### Prerequisites

- A Python project with a `requirements.txt`
- A GitHub or GitLab repository (or use the CLI)

### Step 1 — Add a Dockerfile

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "app.py"]
```

For FastAPI, replace the last line with:

```dockerfile
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Step 2 — Make sure your app binds to `0.0.0.0`

Your server must listen on `0.0.0.0` (not `127.0.0.1`) to be accessible inside the container:

#### Flask

```python
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
```

### Step 3 — Deploy

1. Push your code to your repository.
2. In Dock-Host, click **New App → GitHub**.
3. Select your repository and set the port to `8000`.
4. Click **Deploy**.

## Deploy a Static Website

Dock-Host can serve static websites using a lightweight Nginx container — no backend required.

### Step 1 — Add a Dockerfile

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

Place this `Dockerfile` in the root of your project alongside your `index.html` and other static assets.

### Step 2 — Optional custom Nginx config

If you need custom routing (for example, for a single-page app with client-side routing), create `nginx.conf` in your project root:

```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}
```

Update your `Dockerfile` to include it:

```dockerfile
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
EXPOSE 80
```

### Step 3 — Deploy

1. Push your project to GitHub.
2. In Dock-Host, click **New App → GitHub**.
3. Set the port to `80`.
4. Click **Deploy**.

Your static site will be live at your `*.dock-host.app` URL with Auto-SSL enabled.

## Deploy an Ubuntu Desktop Container

Dock-Host supports graphical desktop environments accessible via a browser using noVNC.

### Step 1 — Add a Dockerfile

```dockerfile
FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    xfce4 \
    xfce4-terminal \
    x11vnc \
    xvfb \
    novnc \
    websockify \
    && apt-get clean
COPY start.sh /start.sh
RUN chmod +x /start.sh
EXPOSE 6080
CMD ["/start.sh"]
```

### Step 2 — Add a startup script

Create `start.sh` in your project root:

```bash
#!/bin/bash
# Start virtual display
Xvfb :1 -screen 0 1280x800x24 &
export DISPLAY=:1

# Start desktop environment
startxfce4 &

# Start VNC server
x11vnc -display :1 -nopw -listen 0.0.0.0 -xkb &

# Start noVNC web interface
websockify --web /usr/share/novnc 6080 localhost:5900
```

### Step 3 — Deploy

1. Push your project to GitHub.
2. In Dock-Host, click **New App → GitHub**.
3. Set the port to `6080`.
4. Click **Deploy**.

Once running, open your app URL in a browser to access the Ubuntu desktop through noVNC.

> Note: Ubuntu Desktop containers are resource-intensive. This setup works on the free plan but performance may be limited by the 512 MB RAM cap.

## Free Plan

The free plan is designed for personal projects, experiments, and getting started with container hosting.

| Resource | Limit |
| --- | --- |
| Apps | 1 |
| CPU | Shared |
| RAM | 512 MB |
| Storage | 1 GB |
| Bandwidth | 10 GB / month |
| SSL | Auto (free) |
| Custom domains | 1 |
| Log retention | 7 days |
| Support | Community |

### Resource behavior

#### CPU

Free plan containers share CPU time with other containers on the same host. This means:

- CPU is not guaranteed — bursts of usage are allowed, but sustained high CPU may be throttled.
- For CPU-intensive workloads (video processing, ML inference, and similar tasks), consider upgrading to a paid plan with dedicated CPU.

#### RAM

Each container is hard-limited to **512 MB** of RAM.

- If your container exceeds this limit, it will be automatically restarted by the system.
- You can monitor memory usage in real time from the **Monitoring** tab.
- An alert email is sent when usage reaches 90% of the limit.

#### Storage

The 1 GB storage limit applies to your Docker image size after build.

- Large base images (for example `ubuntu`, `python`) can consume significant storage — prefer slim or alpine variants where possible.
- Build cache is not counted against your storage limit.

#### Bandwidth

10 GB of outbound bandwidth is included per month on the free plan.

- Inbound traffic (uploads, webhooks) is not counted.
- If you exceed the monthly bandwidth cap, your app will be rate-limited until the next billing period.
- Usage resets on the 1st of each month.

### Limits by feature

| Feature | Free Plan |
| --- | --- |
| Concurrent deployments | 1 |
| Auto-deploy on push | Included |
| Auto-SSL | Included |
| Container monitoring | Included |
| CLI access | Included |
| GitHub / GitLab integration | Included |
| API access | Included |
| Email alerts | Included |
| Custom domains | 1 |
| Team members | — |
| Priority support | — |

### What happens when you hit a limit

| Limit exceeded | Behavior |
| --- | --- |
| RAM | Container is automatically restarted |
| Storage | Build fails with an image size error |
| Bandwidth | App is rate-limited for the remainder of the month |
| App count | New app creation is blocked until an existing app is deleted |

## API Reference

Base URL for all API requests:

```text
https://api.dock-host.com/v1
```

All requests must be made over HTTPS.

### Authentication

Dock-Host uses API key authentication. Include your API key in the `Authorization` header of every request.

```http
Authorization: Bearer YOUR_API_KEY
```

### Getting your API key

1. Go to **Dashboard → Settings → API**.
2. Click **Generate API Key**.
3. Copy the key — it will only be shown once.
4. Store your API key securely. Do not expose it in client-side code or public repositories.

### Example request

```bash
curl https://api.dock-host.com/v1/apps \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Error responses

| Status | Meaning |
| --- | --- |
| `401 Unauthorized` | API key is missing or invalid |
| `403 Forbidden` | API key does not have access to this resource |
| `429 Too Many Requests` | Rate limit exceeded |

## Container Management

### List all apps

**GET** `/apps`

Returns a list of all apps in your account.

**Response:**

```json
{
  "apps": [
    {
      "id": "app_abc123",
      "name": "my-node-app",
      "status": "running",
      "url": "https://my-node-app.dock-host.app",
      "created_at": "2025-03-01T10:00:00Z"
    }
  ]
}
```

### Get app details

**GET** `/apps/:id`

Returns details for a single app.

**Response:**

```json
{
  "id": "app_abc123",
  "name": "my-node-app",
  "status": "running",
  "url": "https://my-node-app.dock-host.app",
  "port": 3000,
  "branch": "main",
  "restart_policy": "always",
  "created_at": "2025-03-01T10:00:00Z",
  "last_deployed_at": "2025-03-10T14:23:00Z"
}
```

### Deploy an app

**POST** `/apps/:id/deploy`

Triggers a new deployment for the specified app, pulling the latest commit from the configured branch.

**Response:**

```json
{
  "deployment_id": "dep_xyz789",
  "status": "building",
  "triggered_at": "2025-03-14T09:00:00Z"
}
```

### Restart a container

**POST** `/apps/:id/restart`

Restarts the running container without triggering a new build.

**Response:**

```json
{
  "status": "restarting",
  "app_id": "app_abc123"
}
```

### Stop an app

**POST** `/apps/:id/stop`

Stops the running container. The app will not restart until manually started or redeployed.

**Response:**

```json
{
  "status": "stopped",
  "app_id": "app_abc123"
}
```

### Delete an app

**DELETE** `/apps/:id`

Permanently deletes an app and its deployment history.

**Response:**

```json
{
  "deleted": true,
  "app_id": "app_abc123"
}
```

## Environment variables

### List variables

**GET** `/apps/:id/env`

### Set a variable

**PUT** `/apps/:id/env`

**Request body:**

```json
{
  "key": "DATABASE_URL",
  "value": "postgres://user:pass@host:5432/db"
}
```

### Delete a variable

**DELETE** `/apps/:id/env/:key`

Changes to environment variables take effect on the next deployment or container restart.

## Usage Metrics

### Get current usage

**GET** `/apps/:id/metrics`

Returns the current resource usage for a container.

**Response:**

```json
{
  "app_id": "app_abc123",
  "cpu_percent": 12.4,
  "ram_used_mb": 210,
  "ram_limit_mb": 512,
  "bandwidth_used_gb": 2.1,
  "bandwidth_limit_gb": 10,
  "uptime_seconds": 86400,
  "restart_count": 0
}
```

### Get usage history

**GET** `/apps/:id/metrics/history`

Returns hourly usage data for the past 24 hours by default.

#### Query parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `period` | string | `24h` | One of: `24h`, `7d`, `30d` |
| `metric` | string | `all` | One of: `cpu`, `ram`, `bandwidth` |

**Example:**

```bash
curl "https://api.dock-host.com/v1/apps/app_abc123/metrics/history?period=7d&metric=ram" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**

```json
{
  "app_id": "app_abc123",
  "metric": "ram",
  "period": "7d",
  "data": [
    { "timestamp": "2025-03-07T00:00:00Z", "value_mb": 195 },
    { "timestamp": "2025-03-08T00:00:00Z", "value_mb": 210 },
    { "timestamp": "2025-03-09T00:00:00Z", "value_mb": 220 }
  ]
}
```

### Account-wide usage

**GET** `/account/usage`

Returns total usage across all apps for the current billing period.

**Response:**

```json
{
  "billing_period_start": "2025-03-01T00:00:00Z",
  "billing_period_end": "2025-03-31T23:59:59Z",
  "bandwidth_used_gb": 3.5,
  "bandwidth_limit_gb": 10,
  "apps_count": 1,
  "apps_limit": 1
}
```
