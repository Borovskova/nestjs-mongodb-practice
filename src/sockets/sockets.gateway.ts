import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

import { Server, WebSocket } from 'ws';

import { Cache } from 'cache-manager';

import { ITDefaultSocketResponse } from './sockets.interface';
import { currentSocketsEventInfo } from 'src/auth/constants/socket.event';

@WebSocketGateway(8080)
export class SocketsGateway implements OnGatewayDisconnect {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('subscribe-user-bookmarks-list')
  async onUserBookmarksListSubscribeEvent(
    client: any,
    @MessageBody() data: any,
  ): Promise<void> {
    await this.handleMassage(data);
  }

  @SubscribeMessage('unsubscribe-user-bookmarks-list')
  async onUserBookmarksListUnsubscribeEvent(
    client: any,
    @MessageBody() data: any,
  ): Promise<void> {
    await this.handleDisconnectEvent(data);
  }

  @SubscribeMessage('subscribe-user-info')
  async onUserInfoSubscribeEvent(
    client: any,
    @MessageBody() data: any,
  ): Promise<void> {
    await this.handleMassage(data);
  }

  @SubscribeMessage('unsubscribe-user-info')
  async onUserInfoUnubscribeEvent(
    client: any,
    @MessageBody() data: any,
  ): Promise<void> {
    await this.handleDisconnectEvent(data);
  }

  public async sendMessage(event: string, data: any): Promise<void> {
    this.server.clients.forEach(async (client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ event, data }));
      } else {
        this.cacheManager.del(currentSocketsEventInfo);
        return;
      }
    });
  }

  public handleDisconnect(client: WebSocket) {
    console.log('disconnected');
  }

  public async handleDisconnectEvent(data: any): Promise<void> {
    const currentSocketsEventInfoFromCache: any =
      await this.cacheManager.get(currentSocketsEventInfo);

    if (
      !currentSocketsEventInfoFromCache ||
      currentSocketsEventInfoFromCache === undefined
    )
      return;

    const subscribeEventInCacheIdx = JSON.parse(
      currentSocketsEventInfoFromCache,
    ).findIndex((item) => data.event.indexOf(item.event) !== -1);
    if (subscribeEventInCacheIdx !== -1) {
      JSON.parse(currentSocketsEventInfoFromCache).splice(
        subscribeEventInCacheIdx,
        1,
      );
      await this.cacheManager.set(
        currentSocketsEventInfo,
        JSON.stringify(currentSocketsEventInfoFromCache),
        100000,
      );
    }
  }

  public async handleMassage(data: any): Promise<void> {
    const socketEventInfo: ITDefaultSocketResponse = {
      event: data.event,
      data,
    };
    const currentSocketsEventInfoFromCache: any =
      await this.cacheManager.get(currentSocketsEventInfo);
    let currentSocketsEventInfoArray: Array<ITDefaultSocketResponse> =
      [];

    if (currentSocketsEventInfoFromCache !== undefined) {
      currentSocketsEventInfoArray = [
        ...JSON.parse(currentSocketsEventInfoFromCache),
      ];
      currentSocketsEventInfoArray.push(socketEventInfo);
    } else {
      currentSocketsEventInfoArray.push(socketEventInfo);
    }
    await this.cacheManager.set(
      currentSocketsEventInfo,
      JSON.stringify(currentSocketsEventInfoArray),
      100000,
    );
    return;
  }
}
