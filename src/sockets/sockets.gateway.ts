// import {
//   ConnectedSocket,
//   MessageBody,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server } from 'http';
// import WebSocket from 'ws';

// @WebSocketGateway()
// export class SocketsGateway {
//   @WebSocketServer()
//   clients = new Map<string, WebSocket>();
//   server: Server;

//   @SubscribeMessage('message')
//   handleMessage(
//     @MessageBody() data,
//     @ConnectedSocket() client: WebSocket,
//   ): string | any {
//     console.log(data, client, 'jjjjjj');
//     return 'Hello world!';
//   }

//   @SubscribeMessage('events')
//   onEvent(@MessageBody() data: unknown): any {
//     console.log(data, 'jjjjjj');
//     return 'Hello world';
//   }
// }

import { WebSocketServer } from 'ws';

export class SocketsGateway {
 public wss = new WebSocketServer({ port: 8080 });

 constructor(){
  this.wss.on('connection', (ws) =>{
    ws.on('error', console.error);

    ws.on('message', (data) => {
      ws.send(this.wssOnMessageHandler(JSON.parse(data)));
    });

    ws.send('Connected!');
  });
 }

 public wssOnMessageHandler(data:any):string | any{
  switch(data[0]){
    case "events":{
      return "User successfully founded!"
    }
    case "rating":{
      return [
        "success",
        {
          "id":1
        }
      ]
    }
  }
 }
}
