# Getting Started

## Creating an Account

1. Go to `dock-host.com` and click **Sign Up**.
2. Enter your email address and choose a password, or sign up using your GitHub account.
3. Verify your email address via the confirmation link sent to your inbox.
4. Once verified, you'll be taken to your dashboard — your home for managing all deployments.

### Free plan includes

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
4. Select the repositories or your entire account that you want to grant access to.
5. Click **Authorize** and return to your dashboard.

### GitLab

1. In your dashboard, go to **Settings → Integrations**.
2. Click **Connect GitLab**.
3. You'll be redirected to GitLab to authorize Dock-Host via OAuth.
4. Approve the requested permissions.
5. Click **Authorize** and return to your dashboard.

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
| Port | The port your container listens on (for example `3000` or `8080`) |
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
