import { CronExpression, Cron } from '@nestjs/schedule';
import { WsException } from '@nestjs/websockets';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { Cache } from 'cache-manager';

import { SocketsGateway } from './sockets.gateway';
import { User } from 'src/users/schemas/user.schema';
import {
  avialiableWebSocketEvents,
  currentSocketsEventInfo,
} from 'src/auth/constants/socket.event';

import { UsersRepository } from 'src/users/users.repository';
import { BookmarkRepository } from 'src/bookmark/bookmark.repository';

@Injectable()
export class SocketTasks {
  constructor(
    private _socketsGateway: SocketsGateway,
    private _usersRepository: UsersRepository,
    private _bookmarkRepository: BookmarkRepository,
    @Inject(CACHE_MANAGER)
    private readonly _cacheManager: Cache,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  private async _sendMessage(): Promise<void> {
    const socketEventInfo: string = await this._cacheManager.get(
      currentSocketsEventInfo,
    );

    if (!socketEventInfo || socketEventInfo === undefined) return;

    for (const socketEvent of JSON.parse(socketEventInfo)) {
      let dataToSend = null;
      switch (socketEvent.event) {
        case avialiableWebSocketEvents.userInfo: {
          dataToSend = await this._getUser(socketEvent.data.userId);
          break;
        }
        case avialiableWebSocketEvents.userBookmarksList: {
          dataToSend = await this._getUserBookmarksList(
            socketEvent.data.userId,
          );
          break;
        }
        default:
          return;
      }

      this._socketsGateway.sendMessage(socketEvent.event, dataToSend);
    }
  }

  private async _getUser(userId: string): Promise<User> {
    const user: User = await this._usersRepository.findOne({
      _id: userId,
    });

    if (!user) {
      throw new WsException({
        status: 'error',
        message: 'User not found',
      });
    }

    return user;
  }

  private async _getUserBookmarksList(userId: string): Promise<any> {
    const user: User = await this._usersRepository.findOne({
      _id: userId,
    });

    if (!user) {
      throw new WsException({
        status: 'error',
        message: 'User not found',
      });
    }
    const userBookmarks =
      await this._bookmarkRepository.getUserBookmarksList(
        userId,
        true,
      );

    return userBookmarks;
  }
}
