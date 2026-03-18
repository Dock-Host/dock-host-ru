# Dock-Host

Dock-Host is a container hosting platform that lets you deploy Dockerized applications in seconds without managing servers yourself. It is designed for developers who want the flexibility of Docker with a simpler deployment experience.

## Overview

With Dock-Host you can:

- Deploy apps from GitHub or GitLab repositories
- Get automatic HTTPS (SSL) for every deployment
- Monitor container CPU, RAM, and network usage
- View live logs and troubleshoot from the dashboard

If an application runs in Docker, it can run on Dock-Host.

## Table of Contents

- [Creating an Account](#creating-an-account)
- [Connecting GitHub or GitLab](#connecting-github-or-gitlab)
- [First Container Deployment](#first-container-deployment)
- [Dockerfile Auto-Detection](#dockerfile-auto-detection)
- [Deploy via GitHub](#deploy-via-github)
- [Deploy via CLI](#deploy-via-cli)

## Creating an Account

1. Go to `dock-host.com` and click **Sign Up**.
2. Create an account with your email and password, or continue with GitHub.
3. Verify your email address using the confirmation link sent to your inbox.
4. After verification, Dock-Host opens your dashboard where you can manage deployments.

### Free plan

The free plan includes:

- 1 app
- Shared CPU
- 512 MB RAM
- Auto-SSL

## Connecting GitHub or GitLab

Connecting a Git provider lets Dock-Host import repositories and automatically look for a Dockerfile when you deploy.

### GitHub

1. Open **Settings → Integrations** from the dashboard.
2. Click **Connect GitHub**.
3. Authorize Dock-Host in GitHub.
4. Select the repositories or account access you want to grant.
5. Return to Dock-Host after authorization completes.

### GitLab

1. Open **Settings → Integrations** from the dashboard.
2. Click **Connect GitLab**.
3. Authorize Dock-Host through GitLab OAuth.
4. Approve the requested permissions.
5. Return to Dock-Host after authorization completes.

Once connected, available repositories appear during app creation.

## First Container Deployment

### Step 1: Create a new app

From the dashboard, click **New App**.

### Step 2: Select a repository

Choose the GitHub or GitLab repository that contains your project. Dock-Host scans the repository for a Dockerfile.

If no Dockerfile is found, you can add one manually or start from a template.

### Step 3: Configure the app

| Setting | Description |
| --- | --- |
| App name | Unique deployment name |
| Branch | Branch to deploy from, usually `main` |
| Port | Port exposed by the container, such as `3000` or `8080` |
| Environment variables | Optional key-value settings passed into the container |

### Step 4: Deploy

Click **Deploy**. Dock-Host will:

1. Pull your repository
2. Build the Docker image
3. Start the container
4. Provision SSL and assign a public URL

A typical deployment finishes in under a minute.

```text
https://your-app-name.dock-host.app
```

### Step 5: Verify with logs

Open the app's **Logs** tab to confirm the container starts correctly and to inspect runtime output.

## Dockerfile Auto-Detection

Dock-Host automatically checks your repository for a Dockerfile and uses it as the build source when found.

### Detection order

| Priority | Path |
| --- | --- |
| 1 | `./Dockerfile` |
| 2 | `./docker/Dockerfile` |
| 3 | Custom path configured manually |

### How detection works

1. Dock-Host clones the selected branch.
2. It searches the repository using the supported path order.
3. If a Dockerfile is found, that file is used immediately.
4. If no file is found, Dock-Host prompts you to add a Dockerfile or choose a starter template.

### Tips

- Ensure your Dockerfile exposes the correct application port.
- Docker Compose files are not supported for deployment.
- You can override the detected Dockerfile path later in **App Settings → Build**.

## Deploy via GitHub

Deploying from GitHub is the recommended path for most users.

### Initial deployment

1. Click **New App** in the dashboard.
2. Choose **GitHub** as the source.
3. Select a connected repository.
4. Pick a branch.
5. Configure the app name, port, and environment variables.
6. Click **Deploy**.

### Auto-deploy on push

To redeploy automatically when code changes are pushed:

1. Open the app.
2. Go to **Settings → Deploy**.
3. Enable **Auto-deploy on push**.
4. Select the branch to watch.

Every push to that branch will trigger a new deployment.

### Manual redeploy

To redeploy manually at any time:

1. Open the app from the dashboard.
2. Click **Redeploy**.

Dock-Host will pull the latest commit from the configured branch and rebuild the application.

## Deploy via CLI

The Dock-Host CLI lets you deploy from your terminal instead of the dashboard.

### Install the CLI

```bash
npm install -g dock-host-cli
```

### Authenticate

```bash
dock-host login
```

You will be asked for the API key from **Dashboard → Settings → API**.

### Deploy a project

From the directory containing your Dockerfile, run:

```bash
dock-host deploy
```

During the first deploy, Dock-Host guides you through naming the app and selecting the port. The CLI saves those settings in `dock-host.json`.

### Common commands

| Command | Description |
| --- | --- |
| `dock-host deploy` | Build and deploy the current project |
| `dock-host logs` | Stream container logs |
| `dock-host restart` | Restart the running container |
| `dock-host status` | Show app status and public URL |
| `dock-host env set KEY=VALUE` | Set an environment variable |
| `dock-host env list` | List environment variables |
| `dock-host apps` | List deployed apps |

### Example workflow

```bash
dock-host login
dock-host deploy
dock-host status
dock-host logs
```
