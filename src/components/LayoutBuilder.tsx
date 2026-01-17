// src/components/LayoutBuilder.tsx
import React from 'react';
import type { LayoutBuilderConfig, LayoutItem } from '../types/config';
import { ComponentWrapper } from './ComponentWrapper';

interface LayoutBuilderProps {
  config: LayoutBuilderConfig;
}

interface LayoutItemRendererProps {
  item: LayoutItem;
}

/**
 * Calculate flex styles for children based on explicit widths/heights
 */
const calculateChildStyles = (
  children: LayoutItem[],
  layoutType: 'flex-row' | 'flex-col'
): React.CSSProperties[] => {
  const sizeKey = layoutType === 'flex-row' ? 'width' : 'height';

  // Parse explicit sizes
  const explicitSizes: (string | null)[] = children.map(child => child[sizeKey] || null);

  // Generate styles for each child
  return children.map((child, index) => {
    const explicitSize = explicitSizes[index];

    if (explicitSize) {
      // Has explicit width/height
      return {
        [sizeKey]: explicitSize,
        flexShrink: 0,
        flexGrow: 0,
      };
    } else if (child.flex !== undefined) {
      // Has explicit flex value
      return {
        flex: child.flex,
      };
    } else {
      // Auto-distribute remaining space equally
      return {
        flex: 1,
      };
    }
  });
};

const LayoutItemRenderer: React.FC<LayoutItemRendererProps> = ({ item }) => {
  // Nested layout
  if (item.layoutType && item.children) {
    const nestedConfig: LayoutBuilderConfig = {
      layoutType: item.layoutType,
      children: item.children,
      width: item.width,
      height: item.height,
      gap: item.gap,
      style: item.style,
    };

    return <LayoutBuilder config={nestedConfig} />;
  }

  // Component rendering
  if (item.component) {
    return (
      <ComponentWrapper
        component={item.component}
        componentProps={item.componentProps}
        dataSource={item.dataSource}
        visibility={item.visibility}
      />
    );
  }

  console.warn('Invalid LayoutItem: must have either component or layoutType+children', item);
  return null;
};

export const LayoutBuilder: React.FC<LayoutBuilderProps> = ({ config }) => {
  const { layoutType, children, width, height, gap, style } = config;

  // Calculate child styles
  const childStyles = calculateChildStyles(children, layoutType);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: layoutType === 'flex-row' ? 'row' : 'column',
    width: width || '100%',
    height: height || '100%',
    gap: gap || '0',
    ...style,
  };

  return (
    <div style={containerStyle}>
      {children.map((child, index) => (
        <div key={index} style={childStyles[index]}>
          <LayoutItemRenderer item={child} />
        </div>
      ))}
    </div>
  );
};
