import { Injectable } from '@nestjs/common';
import { WsException, WsResponse } from '@nestjs/websockets';

import { User } from 'src/users/schemas/user.schema';
import { UsersRepository } from 'src/users/users.repository';


@Injectable()
export class SocketsService {
  constructor(
    private _usersRepository: UsersRepository,
  ) {}

  public async wssEventsHandler(
    data: any,
  ): Promise<WsResponse> {
    const user = await this._usersRepository.findOne({ userId:data.userId})
  
    if(!user){
        throw new WsException({
            status: 'error',
            message:  'User not found'
          });
    }
    return {
        event: data.event,
        data: user
    }
  }
}
