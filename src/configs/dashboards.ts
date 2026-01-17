// src/configs/dashboards.ts
import type { AppConfig } from '../types/config';

export const appConfig: AppConfig = {
  nav: [
    { id: 'dashboards', label: 'Dashboards' },
  ],
  navLayout: {
    direction: 'column',
    style: { height: '100vh', width: '100%' },
    children: [
      // Top navbar - fixed height
      {
        height: '60px',
        direction: 'row',
        style: {
          background: '#1e1e1e',
          color: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          alignItems: 'center',
          padding: '0 1.5rem',
        },
        children: [
          {
            component: 'AppTitle',
            width: '10%', // Take 10% of navbar width
          },
          // NavMenu takes remaining 90% automatically
        ],
      },
      // Main content area - takes remaining height
      {
        direction: 'row',
        style: { overflow: 'hidden' },
        children: [
          // Left sidebar - fixed width
          {
            width: '200px',
            direction: 'column',
            style: {
              background: '#f5f5f5',
              borderRight: '1px solid #e0e0e0',
              padding: '1rem 0',
            },
            children: [
              {
                component: 'SidebarNavItem',
                props: { 
                  itemId: 'dashboards',
                  label: 'Dashboards',
                },
              },
            ],
          },
          // Right content area - takes remaining width automatically
          {
            component: 'ContentArea',
          },
        ],
      },
    ],
  },
  dashboards: [
    {
      id: 'infra-overview',
      title: 'Infrastructure Overview',
      layout: [
        {
          id: 'cpu-chart',
          type: 'chart',
          title: 'CPU Usage',
          position: { x: 0, y: 0, w: 6, h: 4 },
          dataSource: {
            url: 'https://jsonplaceholder.typicode.com/todos',
            method: 'GET',
            polling: { intervalMs: 15000 },
            cacheTTL: 5000,
          },
          chartType: 'line',
          echartsOption: {
            title: { text: 'CPU Usage', left: 'center' },
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            yAxis: { type: 'value', name: 'Usage %' },
            series: [{
              data: [45, 52, 48, 65, 58, 62, 55],
              type: 'line',
              smooth: true,
              areaStyle: {},
            }],
          },
        },
        {
          id: 'memory-gauge',
          type: 'chart',
          title: 'Memory Usage',
          position: { x: 6, y: 0, w: 3, h: 4 },
          chartType: 'gauge',
          echartsOption: {
            series: [{
              type: 'gauge',
              data: [{ value: 68, name: 'Memory %' }],
              detail: { formatter: '{value}%' },
            }],
          },
        },
        {
          id: 'disk-gauge',
          type: 'chart',
          title: 'Disk Usage',
          position: { x: 9, y: 0, w: 3, h: 4 },
          chartType: 'gauge',
          echartsOption: {
            series: [{
              type: 'gauge',
              data: [{ value: 42, name: 'Disk %' }],
              detail: { formatter: '{value}%' },
            }],
          },
        },
        {
          id: 'top-procs',
          type: 'table',
          title: 'Top Processes',
          position: { x: 0, y: 4, w: 6, h: 4 },
          dataSource: {
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET',
          },
          columns: [
            { id: 'name', label: 'Process', sortable: true },
            { id: 'username', label: 'User', sortable: true },
            { id: 'email', label: 'Details', sortable: false },
          ],
        },
        {
          id: 'host-kpi',
          type: 'data',
          title: 'System KPIs',
          position: { x: 6, y: 4, w: 6, h: 4 },
          layout: 'kpi',
          fields: [
            { key: 'uptime', label: 'Uptime', format: 'number' },
            { key: 'connections', label: 'Active Connections', format: 'number' },
            { key: 'requests', label: 'Requests/sec', format: 'number' },
            { key: 'errors', label: 'Error Rate', format: 'percent' },
          ],
          dataSource: {
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'GET',
          },
        },
        {
          id: 'stats',
          type: 'data',
          title: 'Quick Stats',
          position: { x: 0, y: 8, w: 12, h: 2 },
          layout: 'stat',
          fields: [
            { key: 'userId', label: 'Total Users', format: 'number' },
            { key: 'id', label: 'Active Sessions', format: 'number' },
            { key: 'title', label: 'Status' },
          ],
          dataSource: {
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'GET',
          },
        },
      ],
    },
    {
      id: 'network-monitoring',
      title: 'Network Monitoring',
      layout: [
        {
          id: 'network-traffic',
          type: 'chart',
          title: 'Network Traffic',
          position: { x: 0, y: 0, w: 8, h: 5 },
          chartType: 'area',
          echartsOption: {
            title: { text: 'Network Traffic', left: 'center' },
            tooltip: { trigger: 'axis' },
            legend: { data: ['Inbound', 'Outbound'], bottom: 10 },
            xAxis: {
              type: 'category',
              data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            },
            yAxis: { type: 'value', name: 'Mbps' },
            series: [
              {
                name: 'Inbound',
                data: [120, 132, 101, 134, 190, 230, 210],
                type: 'line',
                smooth: true,
                areaStyle: {},
              },
              {
                name: 'Outbound',
                data: [220, 182, 191, 234, 290, 330, 310],
                type: 'line',
                smooth: true,
                areaStyle: {},
              },
            ],
          },
        },
        {
          id: 'connection-stats',
          type: 'data',
          title: 'Connection Statistics',
          position: { x: 8, y: 0, w: 4, h: 5 },
          layout: 'list',
          fields: [
            { key: 'userId', label: 'Active Connections', format: 'number' },
            { key: 'id', label: 'Total Bandwidth', format: 'bytes' },
            { key: 'title', label: 'Network Status' },
          ],
          dataSource: {
            url: 'https://jsonplaceholder.typicode.com/posts/2',
            method: 'GET',
          },
        },
        {
          id: 'bandwidth-chart',
          type: 'chart',
          title: 'Bandwidth Usage by Service',
          position: { x: 0, y: 5, w: 12, h: 4 },
          chartType: 'bar',
          echartsOption: {
            title: { text: 'Bandwidth by Service', left: 'center' },
            tooltip: { trigger: 'axis' },
            xAxis: {
              type: 'category',
              data: ['HTTP', 'HTTPS', 'SSH', 'FTP', 'DNS', 'SMTP'],
            },
            yAxis: { type: 'value', name: 'MB' },
            series: [{
              data: [450, 680, 120, 90, 45, 180],
              type: 'bar',
              itemStyle: { color: '#1976d2' },
            }],
          },
        },
      ],
    },
    {
      id: 'application-metrics',
      title: 'Application Metrics',
      layout: [
        {
          id: 'response-time',
          type: 'chart',
          title: 'Response Time',
          position: { x: 0, y: 0, w: 6, h: 4 },
          chartType: 'line',
          echartsOption: {
            title: { text: 'Average Response Time', left: 'center' },
            tooltip: { trigger: 'axis' },
            xAxis: {
              type: 'category',
              data: ['1h ago', '50m ago', '40m ago', '30m ago', '20m ago', '10m ago', 'Now'],
            },
            yAxis: { type: 'value', name: 'ms' },
            series: [{
              data: [125, 132, 115, 145, 138, 142, 128],
              type: 'line',
              smooth: true,
            }],
          },
        },
        {
          id: 'error-rate',
          type: 'chart',
          title: 'Error Rate',
          position: { x: 6, y: 0, w: 6, h: 4 },
          chartType: 'area',
          echartsOption: {
            title: { text: 'Error Rate %', left: 'center' },
            tooltip: { trigger: 'axis' },
            xAxis: {
              type: 'category',
              data: ['1h ago', '50m ago', '40m ago', '30m ago', '20m ago', '10m ago', 'Now'],
            },
            yAxis: { type: 'value', name: '%' },
            series: [{
              data: [0.2, 0.3, 0.15, 0.4, 0.25, 0.18, 0.22],
              type: 'line',
              smooth: true,
              areaStyle: {},
              itemStyle: { color: '#d32f2f' },
            }],
          },
        },
        {
          id: 'request-table',
          type: 'table',
          title: 'Recent Requests',
          position: { x: 0, y: 4, w: 12, h: 4 },
          dataSource: {
            url: 'https://jsonplaceholder.typicode.com/comments?_limit=10',
            method: 'GET',
          },
          columns: [
            { id: 'id', label: 'ID', sortable: true },
            { id: 'name', label: 'Endpoint', sortable: true },
            { id: 'email', label: 'User', sortable: false },
            { id: 'body', label: 'Details', sortable: false },
          ],
        },
      ],
    },
  ],
};
