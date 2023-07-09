import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';

import { SocketsService } from './sockets/sockets.service';
import { User } from 'src/users/schemas/user.schema';

@WebSocketGateway(8080)
export class SocketsGateway {

  constructor(private _socketsService:SocketsService){}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  async onEvent(client: any, data: any):Promise<WsResponse<User>> {
    return await this._socketsService.wssEventsHandler(data);
  }

}
