import {
  CronExpression,
  Cron,
} from '@nestjs/schedule';
import { WsException } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { Cache } from 'cache-manager';

import { SocketsGateway } from './sockets.gateway';
import { User } from 'src/users/schemas/user.schema';
import { UsersRepository } from 'src/users/users.repository';
import { ITDefaultSocketResponse } from './sockets.interface';

@Injectable()
export class SocketTasks {
  constructor(
    private _socketsGateway: SocketsGateway,
    private _usersRepository: UsersRepository,
    @Inject(CACHE_MANAGER)
    private readonly _cacheManager: Cache,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  private async _sendUser(): Promise<void> {
    const socketEventInfo: ITDefaultSocketResponse =
      await this._cacheManager.get(
        'socketEventInfo',
      );
    if (!socketEventInfo) return;

    const user: User =
      await this._usersRepository.findOne({
        userId: socketEventInfo.data.userId,
      });
    if (!user) {
      throw new WsException({
        status: 'error',
        message: 'User not found',
      });
    }

    this._socketsGateway.sendMessage(
      socketEventInfo.event,
      user,
    );
  }
}
