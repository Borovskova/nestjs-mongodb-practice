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
import { currentSocketEventInfo } from 'src/auth/constants/socket.event';

@WebSocketGateway(8080)
export class SocketsGateway {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  async onEvent(client: any, data: any): Promise<void> {
    const socketEventInfo: ITDefaultSocketResponse = {
      event: 'events',
      data,
    };

    await this.cacheManager.set(
      currentSocketEventInfo,
      socketEventInfo,
      100000,
    );
    return;
  }

  public async sendMessage(event: string, data: any): Promise<void> {
    this.server.clients.forEach(async (client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ event, data }));
      } else {
        this.cacheManager.del(currentSocketEventInfo);
        return;
      }
    });
  }
}
