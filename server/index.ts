import fastify from 'fastify';
import cors from '@fastify/cors';
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify';

import { createContext } from './context';
import { appRouter, type AppRouter } from './router';

const server = fastify({
  maxParamLength: 5000,
});

server.register(cors, {
  origin: ['http://localhost:1420', 'tauri://localhost'],
});

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      // report to error monitoring
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
});

(async () => {
  try {
    const info = await server.listen({ port: 3077 });
    console.log(info);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
