import React from 'react'
import type { ComponentWrapperProps } from '../types/config'
import { useWidgetData } from '../services/apiService'
import { useContextStore } from '../services/contextService'
import { evaluateVisibility } from '../utils/visibility'
import { getComponent } from '../services/componentRegistry'
import { Loading } from './common/Loading'
import { ErrorDisplay } from './common/Error'
import { Empty } from './common/Empty'

export const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  component,
  componentProps = {},
  dataSource,
  visibility,
  cacheTTL,
  renderLoading,
  renderError,
  renderEmpty,
  children,
}) => {
  const context = useContextStore((state) => state.context)

  const isVisible = !visibility || evaluateVisibility(visibility, context)

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useWidgetData(
    dataSource ? { ...dataSource, cacheTTL } : undefined,
    `component-${typeof component === 'string' ? component : 'anonymous'}`,
    true,
  )

  const ResolvedComponent = React.useMemo(() => {
    if (typeof component === 'string') {
      const registered = getComponent(component)
      if (!registered) {
        console.warn(`Component "${component}" not found in registry`)
        return null
      }
      return registered
    }
    return component
  }, [component])

  if (!isVisible) {
    return null
  }

  if (dataSource && isLoading) {
    if (renderLoading) {
      return <>{renderLoading()}</>
    }
    return <Loading />
  }

  if (dataSource && error) {
    if (renderError) {
      return <>{renderError(error as Error, refetch)}</>
    }
    return <ErrorDisplay error={error as Error} onRetry={refetch} />
  }

  if (dataSource && !data) {
    if (renderEmpty) {
      return <>{renderEmpty()}</>
    }
    return <Empty />
  }

  if (!ResolvedComponent) {
    return (
      <div style={{ padding: '1rem', color: '#d32f2f' }}>
        Component not found: {typeof component === 'string' ? component : 'unknown'}
      </div>
    )
  }

  const finalProps = {
    ...componentProps,
    ...(dataSource && data ? { data } : {}),
  }

  return (
    <>
      <ResolvedComponent {...finalProps} />
      {children}
    </>
  )
}
