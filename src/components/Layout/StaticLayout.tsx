// src/components/Layout/StaticLayout.tsx
import React from 'react';
import type { StaticLayoutConfig, StaticLayoutItem } from '../../types/config';
import { WidgetWrapper } from '../Widget/WidgetWrapper';
import { evaluateVisibility } from '../../utils/visibility';
import { useContextStore } from '../../services/contextService';

interface StaticLayoutProps {
  config: StaticLayoutConfig;
}

interface StaticLayoutItemProps {
  item: StaticLayoutItem;
}

// Component registry for rendering named components
const componentRegistry: Record<string, React.ComponentType<any>> = {};

export const registerComponent = (name: string, component: React.ComponentType<any>) => {
  componentRegistry[name] = component;
};

/**
 * Parse size value to get percentage or fixed value
 * Returns: { type: 'percent' | 'fixed' | 'flex', value: number }
 */
const parseSize = (size: string | number | undefined): { type: 'percent' | 'fixed' | 'flex'; value: number } => {
  if (size === undefined) {
    return { type: 'flex', value: 1 };
  }
  
  if (typeof size === 'number') {
    return { type: 'fixed', value: size };
  }
  
  const trimmed = size.trim();
  
  // Check for percentage
  if (trimmed.endsWith('%')) {
    const value = parseFloat(trimmed);
    return { type: 'percent', value: isNaN(value) ? 0 : value };
  }
  
  // Check for pixels
  if (trimmed.endsWith('px')) {
    const value = parseFloat(trimmed);
    return { type: 'fixed', value: isNaN(value) ? 0 : value };
  }
  
  // Other CSS units (rem, em, etc.) treated as fixed
  return { type: 'fixed', value: 0 };
};

/**
 * Calculate size distribution for children
 */
const calculateSizes = (
  children: StaticLayoutItem[],
  direction: 'row' | 'column'
): Array<{ width?: string; height?: string; flex?: string }> => {
  const sizeKey = direction === 'row' ? 'width' : 'height';
  
  // Parse all sizes
  const parsedSizes = children.map(child => parseSize(child[sizeKey]));
  
  // Calculate total percentage used by percentage items
  const percentTotal = parsedSizes.reduce((sum, parsed) => {
    return parsed.type === 'percent' ? sum + parsed.value : sum;
  }, 0);
  
  // Calculate remaining percentage for flex items
  const remainingPercent = Math.max(0, 100 - percentTotal);
  
  // Count flex items and total flex units
  const flexItems = parsedSizes.filter(p => p.type === 'flex');
  const flexTotal = flexItems.reduce((sum, parsed) => {
    return sum + (parsed.value || 1);
  }, 0);
  
  // Generate styles for each child
  return children.map((child, index) => {
    const parsed = parsedSizes[index];
    const result: { width?: string; height?: string; flex?: string } = {};
    
    if (parsed.type === 'percent') {
      // Use percentage directly
      result[sizeKey] = `${parsed.value}%`;
    } else if (parsed.type === 'fixed') {
      // Use fixed size
      if (typeof child[sizeKey] === 'number') {
        result[sizeKey] = `${child[sizeKey]}px`;
      } else {
        result[sizeKey] = child[sizeKey] as string;
      }
      result.flex = '0 0 auto';
    } else {
      // Flex item - calculate percentage from remaining space
      const flexValue = child.flex ?? 1;
      const percentage = flexTotal > 0 ? (flexValue / flexTotal) * remainingPercent : 0;
      result[sizeKey] = `${percentage}%`;
      result.flex = '1 1 auto';
    }
    
    return result;
  });
};

const StaticLayoutItemRenderer: React.FC<StaticLayoutItemProps> = ({ item }) => {
  const context = useContextStore((state) => state.context);

  // Check visibility
  if (item.visibility && !evaluateVisibility(item.visibility, context)) {
    return null;
  }

  // Calculate base style
  const baseStyle: React.CSSProperties = {
    ...item.style,
  };

  // Determine item type from properties (D3-like implicit typing)
  const isWidget = !!item.widgetConfig;
  const isLayout = !!item.direction && !!item.children;
  const isComponent = !!item.component;

  // Render widget
  if (isWidget && item.widgetConfig) {
    return (
      <div style={baseStyle}>
        <WidgetWrapper config={item.widgetConfig} />
      </div>
    );
  }

  // Render nested layout
  if (isLayout && item.children && item.direction) {
    const nestedConfig: StaticLayoutConfig = {
      direction: item.direction,
      children: item.children,
      width: item.width,
      height: item.height,
      style: item.style,
    };
    
    return (
      <div style={baseStyle}>
        <StaticLayout config={nestedConfig} />
      </div>
    );
  }

  // Render registered component
  if (isComponent && item.component) {
    const Component = componentRegistry[item.component];
    
    if (!Component) {
      console.warn(`Component "${item.component}" not found in registry`);
      return (
        <div style={baseStyle}>
          <div style={{ padding: '1rem', color: '#d32f2f' }}>
            Component "{item.component}" not registered
          </div>
        </div>
      );
    }

    return (
      <div style={baseStyle}>
        <Component {...(item.props || {})} />
      </div>
    );
  }

  console.warn('Invalid StaticLayoutItem:', item);
  return null;
};

export const StaticLayout: React.FC<StaticLayoutProps> = ({ config }) => {
  const { direction, children, style, width, height } = config;

  // Calculate sizes for all children
  const childSizes = calculateSizes(children, direction);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
    height: height ? (typeof height === 'number' ? `${height}px` : height) : '100%',
    ...style,
  };

  return (
    <div style={containerStyle}>
      {children.map((child, index) => (
        <div key={index} style={childSizes[index]}>
          <StaticLayoutItemRenderer item={child} />
        </div>
      ))}
    </div>
  );
};
