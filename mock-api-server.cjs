// Mock API server for testing API-driven dashboards
// Run with: node mock-api-server.js

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mock dashboard configurations
const dashboards = {
  'infra-overview': {
    id: 'infra-overview',
    title: 'Infrastructure Overview',
    layout: [
      {
        id: 'cpu-chart',
        type: 'chart',
        title: 'CPU Usage',
        position: { x: 0, y: 0, w: 6, h: 4 },
        dataSource: {
          url: 'http://localhost:3001/api/metrics/cpu',
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
            data: [{ value: 72, name: 'Memory' }],
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
            data: [{ value: 58, name: 'Disk' }],
            detail: { formatter: '{value}%' },
          }],
        },
      },
    ],
    meta: {
      description: 'Main infrastructure monitoring dashboard',
      tags: ['infrastructure', 'monitoring'],
    },
  },
  'app-metrics': {
    id: 'app-metrics',
    title: 'Application Metrics',
    layout: [
      {
        id: 'requests-chart',
        type: 'chart',
        title: 'Requests per Minute',
        position: { x: 0, y: 0, w: 8, h: 5 },
        chartType: 'bar',
        echartsOption: {
          title: { text: 'Requests/Min', left: 'center' },
          tooltip: { trigger: 'axis' },
          xAxis: { type: 'category', data: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25'] },
          yAxis: { type: 'value', name: 'Requests' },
          series: [{
            data: [120, 132, 101, 134, 90, 130],
            type: 'bar',
            itemStyle: { color: '#1976d2' },
          }],
        },
      },
      {
        id: 'response-time',
        type: 'data',
        title: 'Avg Response Time',
        position: { x: 8, y: 0, w: 4, h: 5 },
        layout: 'kpi',
        fields: [
          { key: 'value', label: 'Response Time', format: '{value}ms' },
          { key: 'trend', label: 'Trend', format: '{value}%' },
        ],
        dataSource: {
          url: 'http://localhost:3001/api/metrics/response-time',
          method: 'GET',
        },
      },
    ],
    meta: {
      description: 'Application performance metrics',
      tags: ['application', 'performance'],
    },
  },
  'network-monitoring': {
    id: 'network-monitoring',
    title: 'Network Monitoring',
    layout: [
      {
        id: 'bandwidth-chart',
        type: 'chart',
        title: 'Network Bandwidth',
        position: { x: 0, y: 0, w: 8, h: 4 },
        chartType: 'line',
        echartsOption: {
          title: { text: 'Network Bandwidth (Mbps)', left: 'center' },
          tooltip: { trigger: 'axis' },
          legend: { data: ['Upload', 'Download'], bottom: 10 },
          xAxis: { 
            type: 'category', 
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'] 
          },
          yAxis: { type: 'value', name: 'Mbps' },
          series: [
            {
              name: 'Upload',
              data: [120, 132, 145, 138, 152, 140],
              type: 'line',
              smooth: true,
              itemStyle: { color: '#4caf50' },
            },
            {
              name: 'Download',
              data: [220, 242, 265, 248, 272, 260],
              type: 'line',
              smooth: true,
              itemStyle: { color: '#2196f3' },
            },
          ],
        },
      },
      {
        id: 'latency-gauge',
        type: 'chart',
        title: 'Network Latency',
        position: { x: 8, y: 0, w: 4, h: 4 },
        chartType: 'gauge',
        echartsOption: {
          series: [{
            type: 'gauge',
            data: [{ value: 23, name: 'Latency (ms)' }],
            detail: { formatter: '{value}ms' },
            max: 100,
          }],
        },
      },
      {
        id: 'packet-loss',
        type: 'chart',
        title: 'Packet Loss',
        position: { x: 0, y: 4, w: 6, h: 4 },
        chartType: 'bar',
        echartsOption: {
          title: { text: 'Packet Loss (%)', left: 'center' },
          tooltip: { trigger: 'axis' },
          xAxis: { 
            type: 'category', 
            data: ['Router 1', 'Router 2', 'Router 3', 'Router 4', 'Router 5'] 
          },
          yAxis: { type: 'value', name: '%' },
          series: [{
            data: [0.2, 0.1, 0.3, 0.15, 0.25],
            type: 'bar',
            itemStyle: { color: '#ff9800' },
          }],
        },
      },
      {
        id: 'connection-status',
        type: 'data',
        title: 'Active Connections',
        position: { x: 6, y: 4, w: 6, h: 4 },
        layout: 'stat',
        fields: [
          { key: 'total', label: 'Total Connections', format: '{value}' },
          { key: 'active', label: 'Active', format: '{value}' },
          { key: 'idle', label: 'Idle', format: '{value}' },
        ],
      },
    ],
    meta: {
      description: 'Network performance and monitoring',
      tags: ['network', 'monitoring', 'bandwidth'],
    },
  },
  'application-metrics': {
    id: 'application-metrics',
    title: 'Application Metrics',
    layout: [
      {
        id: 'requests-chart',
        type: 'chart',
        title: 'Requests per Minute',
        position: { x: 0, y: 0, w: 8, h: 5 },
        chartType: 'bar',
        echartsOption: {
          title: { text: 'Requests/Min', left: 'center' },
          tooltip: { trigger: 'axis' },
          xAxis: { type: 'category', data: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25'] },
          yAxis: { type: 'value', name: 'Requests' },
          series: [{
            data: [120, 132, 101, 134, 90, 130],
            type: 'bar',
            itemStyle: { color: '#1976d2' },
          }],
        },
      },
      {
        id: 'response-time',
        type: 'data',
        title: 'Avg Response Time',
        position: { x: 8, y: 0, w: 4, h: 5 },
        layout: 'kpi',
        fields: [
          { key: 'value', label: 'Response Time', format: '{value}ms' },
          { key: 'trend', label: 'Trend', format: '{value}%' },
        ],
        dataSource: {
          url: 'http://localhost:3001/api/metrics/response-time',
          method: 'GET',
        },
      },
    ],
    meta: {
      description: 'Application performance metrics',
      tags: ['application', 'performance'],
    },
  },
};

// Get dashboard by ID
app.get('/api/dashboards/:id', (req, res) => {
  const dashboard = dashboards[req.params.id];
  
  if (!dashboard) {
    return res.status(404).json({ 
      error: 'Dashboard not found',
      message: `Dashboard with ID "${req.params.id}" does not exist`,
    });
  }
  
  // Simulate network delay
  setTimeout(() => {
    res.json(dashboard);
  }, 500);
});

// List all available dashboards
app.get('/api/dashboards', (req, res) => {
  const dashboardList = Object.values(dashboards).map(d => ({
    id: d.id,
    title: d.title,
    meta: d.meta,
    widgetCount: d.layout.length,
  }));
  
  res.json(dashboardList);
});

// Mock data endpoints for widgets
app.get('/api/metrics/cpu', (req, res) => {
  res.json({
    data: [45, 52, 48, 65, 58, 62, 55],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  });
});

app.get('/api/metrics/response-time', (req, res) => {
  res.json({
    value: 245,
    trend: -12, // -12% improvement
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Mock API server running on http://localhost:${PORT}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET /api/dashboards           - List all dashboards`);
  console.log(`  GET /api/dashboards/:id       - Get dashboard config`);
  console.log(`\nAvailable dashboards:`);
  Object.keys(dashboards).forEach(id => {
    console.log(`  - ${id}: http://localhost:5173/dash/${id}`);
  });
});
