# Example Apps

For repository layout recommendations before using these examples, see [Project Structure](project-structure.md).

## Deploy a Node.js App

### Prerequisites

- A Node.js project with a `package.json`
- A GitHub or GitLab repository, or the Dock-Host CLI

### Step 1 — Add a Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

Replace `index.js` with your actual entry point if it is different.

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
- A GitHub or GitLab repository, or the Dock-Host CLI

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

### Step 2 — Bind to `0.0.0.0`

Your server must listen on `0.0.0.0` rather than `127.0.0.1`:

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

Dock-Host can serve static websites using a lightweight Nginx container.

### Step 1 — Add a Dockerfile

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

Place this `Dockerfile` in the root of your project alongside `index.html` and other static assets.

### Step 2 — Optional custom Nginx config

If you need client-side routing, create `nginx.conf` in your project root:

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

> Note: Ubuntu Desktop containers are resource-intensive. Performance may be limited on the free plan because of the 512 MB RAM cap.
