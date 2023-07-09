import { Module } from '@nestjs/common';

import { SocketsGateway } from './sockets.gateway';
import { SocketsService } from './sockets/sockets.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [SocketsGateway, SocketsService]
})
export class SocketsModule {}
