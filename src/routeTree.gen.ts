/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ToolsImport } from './routes/tools'
import { Route as SettingsImport } from './routes/settings'
import { Route as EditorImport } from './routes/editor'
import { Route as SettingsSystemImport } from './routes/settings/system'
import { Route as SettingsServiceConfigImport } from './routes/settings/service-config'
import { Route as SettingsProfileImport } from './routes/settings/profile'
import { Route as SettingsNotificationsImport } from './routes/settings/notifications'

// Create Virtual Routes

const LoginRegisterLazyImport = createFileRoute('/login-register')()
const DatasourceLazyImport = createFileRoute('/datasource')()
const DataCenterLazyImport = createFileRoute('/data-center')()
const AiLazyImport = createFileRoute('/ai')()
const IndexLazyImport = createFileRoute('/')()
const ToolsJsonActionLazyImport = createFileRoute('/tools/json-action')()
const EditorNovelLazyImport = createFileRoute('/editor/novel')()
const EditorMonacoLazyImport = createFileRoute('/editor/monaco')()
const DataCenterRxdbLazyImport = createFileRoute('/data-center/rxdb')()
const DataCenterRxdbDatabaseLazyImport = createFileRoute(
  '/data-center/rxdb/database',
)()
const DataCenterRxdbCollectionsLazyImport = createFileRoute(
  '/data-center/rxdb/collections',
)()

// Create/Update Routes

const LoginRegisterLazyRoute = LoginRegisterLazyImport.update({
  path: '/login-register',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/login-register.lazy').then((d) => d.Route),
)

const DatasourceLazyRoute = DatasourceLazyImport.update({
  path: '/datasource',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/datasource.lazy').then((d) => d.Route))

const DataCenterLazyRoute = DataCenterLazyImport.update({
  path: '/data-center',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/data-center.lazy').then((d) => d.Route))

const AiLazyRoute = AiLazyImport.update({
  path: '/ai',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/ai.lazy').then((d) => d.Route))

const ToolsRoute = ToolsImport.update({
  path: '/tools',
  getParentRoute: () => rootRoute,
} as any)

const SettingsRoute = SettingsImport.update({
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any)

const EditorRoute = EditorImport.update({
  path: '/editor',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ToolsJsonActionLazyRoute = ToolsJsonActionLazyImport.update({
  path: '/json-action',
  getParentRoute: () => ToolsRoute,
} as any).lazy(() =>
  import('./routes/tools/json-action.lazy').then((d) => d.Route),
)

const EditorNovelLazyRoute = EditorNovelLazyImport.update({
  path: '/novel',
  getParentRoute: () => EditorRoute,
} as any).lazy(() => import('./routes/editor/novel.lazy').then((d) => d.Route))

const EditorMonacoLazyRoute = EditorMonacoLazyImport.update({
  path: '/monaco',
  getParentRoute: () => EditorRoute,
} as any).lazy(() => import('./routes/editor/monaco.lazy').then((d) => d.Route))

const DataCenterRxdbLazyRoute = DataCenterRxdbLazyImport.update({
  path: '/rxdb',
  getParentRoute: () => DataCenterLazyRoute,
} as any).lazy(() =>
  import('./routes/data-center/rxdb.lazy').then((d) => d.Route),
)

const SettingsSystemRoute = SettingsSystemImport.update({
  path: '/system',
  getParentRoute: () => SettingsRoute,
} as any)

const SettingsServiceConfigRoute = SettingsServiceConfigImport.update({
  path: '/service-config',
  getParentRoute: () => SettingsRoute,
} as any)

const SettingsProfileRoute = SettingsProfileImport.update({
  path: '/profile',
  getParentRoute: () => SettingsRoute,
} as any)

const SettingsNotificationsRoute = SettingsNotificationsImport.update({
  path: '/notifications',
  getParentRoute: () => SettingsRoute,
} as any)

const DataCenterRxdbDatabaseLazyRoute = DataCenterRxdbDatabaseLazyImport.update(
  {
    path: '/database',
    getParentRoute: () => DataCenterRxdbLazyRoute,
  } as any,
).lazy(() =>
  import('./routes/data-center/rxdb/database.lazy').then((d) => d.Route),
)

const DataCenterRxdbCollectionsLazyRoute =
  DataCenterRxdbCollectionsLazyImport.update({
    path: '/collections',
    getParentRoute: () => DataCenterRxdbLazyRoute,
  } as any).lazy(() =>
    import('./routes/data-center/rxdb/collections.lazy').then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/editor': {
      preLoaderRoute: typeof EditorImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      preLoaderRoute: typeof SettingsImport
      parentRoute: typeof rootRoute
    }
    '/tools': {
      preLoaderRoute: typeof ToolsImport
      parentRoute: typeof rootRoute
    }
    '/ai': {
      preLoaderRoute: typeof AiLazyImport
      parentRoute: typeof rootRoute
    }
    '/data-center': {
      preLoaderRoute: typeof DataCenterLazyImport
      parentRoute: typeof rootRoute
    }
    '/datasource': {
      preLoaderRoute: typeof DatasourceLazyImport
      parentRoute: typeof rootRoute
    }
    '/login-register': {
      preLoaderRoute: typeof LoginRegisterLazyImport
      parentRoute: typeof rootRoute
    }
    '/settings/notifications': {
      preLoaderRoute: typeof SettingsNotificationsImport
      parentRoute: typeof SettingsImport
    }
    '/settings/profile': {
      preLoaderRoute: typeof SettingsProfileImport
      parentRoute: typeof SettingsImport
    }
    '/settings/service-config': {
      preLoaderRoute: typeof SettingsServiceConfigImport
      parentRoute: typeof SettingsImport
    }
    '/settings/system': {
      preLoaderRoute: typeof SettingsSystemImport
      parentRoute: typeof SettingsImport
    }
    '/data-center/rxdb': {
      preLoaderRoute: typeof DataCenterRxdbLazyImport
      parentRoute: typeof DataCenterLazyImport
    }
    '/editor/monaco': {
      preLoaderRoute: typeof EditorMonacoLazyImport
      parentRoute: typeof EditorImport
    }
    '/editor/novel': {
      preLoaderRoute: typeof EditorNovelLazyImport
      parentRoute: typeof EditorImport
    }
    '/tools/json-action': {
      preLoaderRoute: typeof ToolsJsonActionLazyImport
      parentRoute: typeof ToolsImport
    }
    '/data-center/rxdb/collections': {
      preLoaderRoute: typeof DataCenterRxdbCollectionsLazyImport
      parentRoute: typeof DataCenterRxdbLazyImport
    }
    '/data-center/rxdb/database': {
      preLoaderRoute: typeof DataCenterRxdbDatabaseLazyImport
      parentRoute: typeof DataCenterRxdbLazyImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  EditorRoute.addChildren([EditorMonacoLazyRoute, EditorNovelLazyRoute]),
  SettingsRoute.addChildren([
    SettingsNotificationsRoute,
    SettingsProfileRoute,
    SettingsServiceConfigRoute,
    SettingsSystemRoute,
  ]),
  ToolsRoute.addChildren([ToolsJsonActionLazyRoute]),
  AiLazyRoute,
  DataCenterLazyRoute.addChildren([
    DataCenterRxdbLazyRoute.addChildren([
      DataCenterRxdbCollectionsLazyRoute,
      DataCenterRxdbDatabaseLazyRoute,
    ]),
  ]),
  DatasourceLazyRoute,
  LoginRegisterLazyRoute,
])

/* prettier-ignore-end */
