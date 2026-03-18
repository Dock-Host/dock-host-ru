# API Reference

Base URL for all API requests:

```text
https://api.dock-host.com/v1
```

All requests must be made over HTTPS.

## Authentication

Dock-Host uses API key authentication. Include your API key in the `Authorization` header of every request.

```http
Authorization: Bearer YOUR_API_KEY
```

## Getting your API key

1. Go to **Dashboard → Settings → API**.
2. Click **Generate API Key**.
3. Copy the key — it will only be shown once.
4. Store your API key securely and do not expose it in client-side code or public repositories.

## Example request

```bash
curl https://api.dock-host.com/v1/apps \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Error responses

| Status | Meaning |
| --- | --- |
| `401 Unauthorized` | API key is missing or invalid |
| `403 Forbidden` | API key does not have access to this resource |
| `429 Too Many Requests` | Rate limit exceeded |

## Container Management

### List all apps

**GET** `/apps`

Returns a list of all apps in your account.

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

```json
{
  "status": "restarting",
  "app_id": "app_abc123"
}
```

### Stop an app

**POST** `/apps/:id/stop`

Stops the running container. The app will not restart until manually started or redeployed.

```json
{
  "status": "stopped",
  "app_id": "app_abc123"
}
```

### Delete an app

**DELETE** `/apps/:id`

Permanently deletes an app and its deployment history.

```json
{
  "deleted": true,
  "app_id": "app_abc123"
}
```

## Environment Variables

### List variables

**GET** `/apps/:id/env`

### Set a variable

**PUT** `/apps/:id/env`

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

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `period` | string | `24h` | One of: `24h`, `7d`, `30d` |
| `metric` | string | `all` | One of: `cpu`, `ram`, `bandwidth` |

```bash
curl "https://api.dock-host.com/v1/apps/app_abc123/metrics/history?period=7d&metric=ram" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

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
