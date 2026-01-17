// src/pages/Database/DatabasePage.tsx
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { LayoutBuilder } from '../../components/LayoutBuilder';
import type { LayoutBuilderConfig } from '../../types/config';

export const DatabasePage: React.FC = () => {
  const metrics = useLoaderData() as any;

  // Build layout config for database metrics
  const layoutConfig: LayoutBuilderConfig = {
    layoutType: 'flex-col',
    gap: '1.5rem',
    style: {
      padding: '2rem',
      background: '#fafafa',
      minHeight: '100%',
    },
    children: [
      // Title
      {
        component: 'DatabaseTitle',
      },
      // First row: 3 stat cards
      {
        layoutType: 'flex-row',
        gap: '1.5rem',
        children: [
          {
            component: 'Data',
            componentProps: {
              data: { value: metrics.activeConnections },
              layout: 'stat',
              fields: [
                { key: 'value', label: 'Active Connections', format: 'number' },
              ],
            },
            style: {
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              minHeight: '150px',
            },
          },
          {
            component: 'Data',
            componentProps: {
              data: { value: metrics.queriesPerSecond },
              layout: 'stat',
              fields: [
                { key: 'value', label: 'Queries/Sec', format: 'number' },
              ],
            },
            style: {
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              minHeight: '150px',
            },
          },
          {
            component: 'Data',
            componentProps: {
              data: { value: metrics.slowQueries },
              layout: 'stat',
              fields: [
                { key: 'value', label: 'Slow Queries', format: 'number' },
              ],
            },
            style: {
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              minHeight: '150px',
            },
          },
        ],
      },
      // Second row: 3 more stat cards
      {
        layoutType: 'flex-row',
        gap: '1.5rem',
        children: [
          {
            component: 'Data',
            componentProps: {
              data: { value: metrics.replicationLag },
              layout: 'stat',
              fields: [
                { key: 'value', label: 'Replication Lag (s)', format: '{value}' },
              ],
            },
            style: {
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              minHeight: '150px',
            },
          },
          {
            component: 'Data',
            componentProps: {
              data: { value: metrics.bufferPoolHitRatio },
              layout: 'stat',
              fields: [
                { key: 'value', label: 'Buffer Pool Hit %', format: 'percent' },
              ],
            },
            style: {
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              minHeight: '150px',
            },
          },
          {
            component: 'Data',
            componentProps: {
              data: { value: metrics.innodbPendingIO },
              layout: 'stat',
              fields: [
                { key: 'value', label: 'InnoDB Pending I/O', format: 'number' },
              ],
            },
            style: {
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              minHeight: '150px',
            },
          },
        ],
      },
      // Third row: QPS history chart
      {
        component: 'Chart',
        componentProps: {
          data: metrics.qpsHistory || [],
          chartType: 'line',
          title: 'Queries Per Second History',
          echartsOption: metrics.qpsHistory ? {
            title: { text: 'Queries Per Second History', left: 'center' },
            tooltip: { trigger: 'axis' },
            xAxis: {
              type: 'category',
              data: metrics.qpsHistory.timestamps || [],
            },
            yAxis: {
              type: 'value',
              name: 'QPS',
            },
            series: [{
              data: metrics.qpsHistory.values || [],
              type: 'line',
              smooth: true,
              areaStyle: { opacity: 0.3 },
            }],
          } : undefined,
        },
        style: {
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '1rem',
          minHeight: '400px',
        },
      },
    ],
  };

  return <LayoutBuilder config={layoutConfig} />;
};
