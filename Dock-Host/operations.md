# Operations Guide

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
3. View live metrics or switch to the **History** view for the past 24 hours, 7 days, or 30 days.

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

Build logs from the Docker image build step are separate from runtime logs. To view them:

1. Go to your app's **Deployments** tab.
2. Click any deployment entry.
3. Select **Build Logs** to see the full Docker build output.

### Debugging common issues

| Symptom | Where to look |
| --- | --- |
| App won't start | Build Logs for missing dependencies or build errors |
| App crashes on startup | Runtime Logs for missing environment variables |
| App returns 502 | Confirm the container is listening on the correct port |
| High memory usage | Monitoring tab for memory leaks |

### CLI log streaming

```bash
dock-host logs
```

Add `--tail 100` to see the last 100 lines, or `--follow` to keep streaming:

```bash
dock-host logs --follow
```

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

Free plan containers share CPU time with other containers on the same host.

- CPU is not guaranteed. Bursts are allowed, but sustained high CPU may be throttled.
- For CPU-intensive workloads, consider upgrading to a paid plan with dedicated CPU.

#### RAM

Each container is hard-limited to **512 MB** of RAM.

- If your container exceeds this limit, it will be automatically restarted.
- You can monitor memory usage in real time from the **Monitoring** tab.
- An alert email is sent when usage reaches 90% of the limit.

#### Storage

The 1 GB storage limit applies to your Docker image size after build.

- Large base images such as `ubuntu` or `python` can consume significant storage.
- Prefer `slim` or `alpine` variants when possible.
- Build cache is not counted against your storage limit.

#### Bandwidth

10 GB of outbound bandwidth is included per month on the free plan.

- Inbound traffic such as uploads and webhooks is not counted.
- If you exceed the monthly bandwidth cap, your app is rate-limited until the next billing period.
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
