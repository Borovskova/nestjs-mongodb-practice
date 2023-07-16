import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

import { Server } from 'ws';

import { Cache } from 'cache-manager';

import { ITDefaultSocketResponse } from './sockets.interface';

@WebSocketGateway(8080)
export class SocketsGateway {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  async onEvent(
    client: any,
    data: any,
  ): Promise<void> {
    const socketEventInfo: ITDefaultSocketResponse =
      {
        event: 'events',
        data,
      };
    await this.cacheManager.set(
      'socketEventInfo',
      socketEventInfo,
      100000,
    );
    return;
  }

  public async sendMessage(
    event: string,
    data: any,
  ): Promise<void> {
    this.server.clients.forEach(
      async (client) => {
        if (client.readyState === client.OPEN) {
          client.send(
            JSON.stringify({ event, data }),
          );
        } else {
          await this.cacheManager.del(
            'socketEventInfo',
          );
          return;
        }
      },
    );
  }
}
