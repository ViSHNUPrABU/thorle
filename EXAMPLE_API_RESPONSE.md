# Example API Response

This file shows exactly what your API should return for the dashboard config endpoint.

## Endpoint

```
GET /api/dashboards/:dashboardId
```

## Complete Example Response

```json
{
  "id": "infra-overview",
  "title": "Infrastructure Overview",
  "layout": [
    {
      "id": "cpu-chart",
      "type": "chart",
      "title": "CPU Usage Over Time",
      "position": {
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 4,
        "minW": 3,
        "minH": 3
      },
      "dataSource": {
        "url": "https://api.example.com/metrics/cpu",
        "method": "GET",
        "polling": {
          "intervalMs": 15000,
          "stopOnError": false
        },
        "cacheTTL": 5000
      },
      "chartType": "line",
      "echartsOption": {
        "title": {
          "text": "CPU Usage",
          "left": "center"
        },
        "tooltip": {
          "trigger": "axis"
        },
        "xAxis": {
          "type": "category",
          "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        "yAxis": {
          "type": "value",
          "name": "Usage %"
        },
        "series": [
          {
            "data": [45, 52, 48, 65, 58, 62, 55],
            "type": "line",
            "smooth": true,
            "areaStyle": {}
          }
        ]
      }
    },
    {
      "id": "memory-gauge",
      "type": "chart",
      "title": "Memory Usage",
      "position": {
        "x": 6,
        "y": 0,
        "w": 3,
        "h": 4
      },
      "chartType": "gauge",
      "echartsOption": {
        "series": [
          {
            "type": "gauge",
            "data": [
              {
                "value": 72,
                "name": "Memory"
              }
            ],
            "detail": {
              "formatter": "{value}%"
            }
          }
        ]
      }
    },
    {
      "id": "disk-gauge",
      "type": "chart",
      "title": "Disk Usage",
      "position": {
        "x": 9,
        "y": 0,
        "w": 3,
        "h": 4
      },
      "chartType": "gauge",
      "echartsOption": {
        "series": [
          {
            "type": "gauge",
            "data": [
              {
                "value": 58,
                "name": "Disk"
              }
            ],
            "detail": {
              "formatter": "{value}%"
            }
          }
        ]
      }
    },
    {
      "id": "server-table",
      "type": "table",
      "title": "Server Status",
      "position": {
        "x": 0,
        "y": 4,
        "w": 12,
        "h": 5
      },
      "dataSource": {
        "url": "https://api.example.com/servers/status",
        "method": "GET",
        "polling": {
          "intervalMs": 30000
        }
      },
      "columns": [
        {
          "id": "name",
          "label": "Server Name",
          "sortable": true
        },
        {
          "id": "status",
          "label": "Status",
          "render": "status === 'online' ? '🟢 Online' : '🔴 Offline'"
        },
        {
          "id": "cpu",
          "label": "CPU %",
          "sortable": true
        },
        {
          "id": "memory",
          "label": "Memory %",
          "sortable": true
        },
        {
          "id": "uptime",
          "label": "Uptime",
          "render": "Math.floor(value / 3600) + 'h'"
        }
      ],
      "pagination": {
        "mode": "client",
        "pageSize": 10
      }
    },
    {
      "id": "alerts-kpi",
      "type": "data",
      "title": "Active Alerts",
      "position": {
        "x": 0,
        "y": 9,
        "w": 4,
        "h": 3
      },
      "layout": "kpi",
      "fields": [
        {
          "key": "critical",
          "label": "Critical",
          "format": "{value}"
        },
        {
          "key": "warning",
          "label": "Warning",
          "format": "{value}"
        },
        {
          "key": "info",
          "label": "Info",
          "format": "{value}"
        }
      ],
      "dataSource": {
        "url": "https://api.example.com/alerts/summary",
        "method": "GET",
        "polling": {
          "intervalMs": 10000
        }
      }
    },
    {
      "id": "network-chart",
      "type": "chart",
      "title": "Network Traffic",
      "position": {
        "x": 4,
        "y": 9,
        "w": 8,
        "h": 3
      },
      "chartType": "bar",
      "dataSource": {
        "url": "https://api.example.com/metrics/network",
        "method": "GET",
        "polling": {
          "intervalMs": 20000
        }
      },
      "echartsOption": {
        "tooltip": {
          "trigger": "axis"
        },
        "legend": {
          "data": ["Inbound", "Outbound"]
        },
        "xAxis": {
          "type": "category",
          "data": ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
        },
        "yAxis": {
          "type": "value",
          "name": "GB/s"
        },
        "series": [
          {
            "name": "Inbound",
            "type": "bar",
            "data": [2.3, 3.2, 4.5, 5.1, 4.8, 3.9]
          },
          {
            "name": "Outbound",
            "type": "bar",
            "data": [1.8, 2.5, 3.2, 4.0, 3.5, 2.9]
          }
        ]
      }
    }
  ],
  "meta": {
    "description": "Main infrastructure monitoring dashboard",
    "tags": ["infrastructure", "monitoring", "servers"],
    "owner": "DevOps Team",
    "refreshInterval": 60000,
    "created": "2024-01-15T10:00:00Z",
    "updated": "2024-11-02T15:30:00Z"
  }
}
```

## Field Descriptions

### Dashboard Level
- `id` (string, required): Unique identifier, matches the route parameter
- `title` (string, required): Dashboard display name
- `layout` (array, required): Array of widget configurations
- `meta` (object, optional): Additional metadata

### Widget Common Fields
- `id` (string, required): Unique widget identifier
- `type` (string, required): "chart" | "table" | "data"
- `title` (string, optional): Widget title displayed in header
- `position` (object, optional): Grid position and size
  - `x` (number): Column position (0-11)
  - `y` (number): Row position
  - `w` (number): Width in columns (1-12)
  - `h` (number): Height in rows
  - `minW` (number, optional): Minimum width
  - `minH` (number, optional): Minimum height
- `dataSource` (object, optional): API endpoint for widget data
  - `url` (string): API endpoint URL
  - `method` (string): "GET" | "POST"
  - `headers` (object, optional): HTTP headers
  - `params` (object, optional): Query parameters
  - `body` (any, optional): Request body for POST
  - `polling` (object, optional): Auto-refresh config
    - `intervalMs` (number): Refresh interval in milliseconds
    - `stopOnError` (boolean, optional): Stop polling on error
  - `cacheTTL` (number, optional): Cache time-to-live in ms

### Chart Widget Specific
- `chartType` (string, required): "line" | "bar" | "area" | "heatmap" | "gauge" | "custom"
- `echartsOption` (object, required): ECharts configuration object

### Table Widget Specific
- `columns` (array, required): Column definitions
  - `id` (string): Column key
  - `label` (string): Column header text
  - `sortable` (boolean, optional): Enable sorting
  - `render` (string, optional): JavaScript expression for rendering
- `pagination` (object, optional): Pagination config
  - `mode` (string): "client" | "server"
  - `pageSize` (number): Items per page

### Data Widget Specific
- `layout` (string, required): "stat" | "list" | "kpi"
- `fields` (array, required): Field definitions
  - `key` (string): Data key
  - `label` (string, optional): Field label
  - `format` (string, optional): Format template

## Widget Data Response Examples

### CPU Metrics Endpoint
```
GET /api/metrics/cpu
```
```json
{
  "data": [45, 52, 48, 65, 58, 62, 55],
  "labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  "timestamp": "2024-11-02T15:30:00Z"
}
```

### Server Status Endpoint
```
GET /api/servers/status
```
```json
[
  {
    "name": "web-01",
    "status": "online",
    "cpu": 45.2,
    "memory": 68.5,
    "uptime": 345600
  },
  {
    "name": "web-02",
    "status": "online",
    "cpu": 52.1,
    "memory": 71.3,
    "uptime": 345600
  }
]
```

### Alerts Summary Endpoint
```
GET /api/alerts/summary
```
```json
{
  "critical": 2,
  "warning": 5,
  "info": 12,
  "total": 19
}
```

## Error Response

If dashboard not found:
```json
{
  "error": "Dashboard not found",
  "message": "Dashboard with ID 'invalid-id' does not exist",
  "statusCode": 404
}
```

## Testing

Use the provided `mock-api-server.js` to test these responses locally.

## Implementation Notes

1. The widget `dataSource` URLs can be relative or absolute
2. If using relative URLs, ensure your API proxy is configured
3. Widget data is fetched separately from dashboard config
4. Dashboard config is cached by React Query (60s default)
5. Widget data respects individual polling and cache settings
