# Deployment Guide

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

- Review the example repository layouts in [Project Structure](project-structure.md) before connecting a repository.
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

Navigate to your project directory, where your Dockerfile is located, and run:

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

Sometimes a container needs to be restarted — for example, after updating environment variables or to recover from an unexpected crash.

### Via the dashboard

1. Open your app from the dashboard.
2. Click the **Restart** button in the top-right corner.

The container will stop and start again using the current image with no rebuild.

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
- Certificates are renewed automatically before they expire.

### Custom domains

1. Open your app and go to **Settings → Domains**.
2. Click **Add Custom Domain** and enter your domain, for example `app.yourdomain.com`.
3. Add the CNAME record shown to your DNS provider.
4. Dock-Host will detect the DNS change and issue an SSL certificate for your custom domain automatically.

SSL is included on all plans, including the free plan.
