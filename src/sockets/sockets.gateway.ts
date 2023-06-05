import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import WebSocket from 'ws';

@WebSocketGateway()
export class SocketsGateway {
  @WebSocketServer()
  clients = new Map<string, WebSocket>();

  // handleConnection(client: WebSocket) {
  //   this.clients.set(client.id, client);
  // }

  // handleDisconnect(client: WebSocket) {
  //   this.clients.delete(client.id);
  // }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: WebSocket,
  ): string | any {
    // client.join('rating');
    console.log(client);

    return 'Hello world!';
  }

  @SubscribeMessage('events')
  onEvent(@MessageBody() data: unknown): any {
    const event = 'events';
    const response = [1, 2, 3];
    console.log(data);

    return 'Hello world';
  }
}
