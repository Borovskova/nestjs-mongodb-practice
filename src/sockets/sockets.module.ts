import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { SocketsGateway } from './sockets.gateway';
import { UsersModule } from 'src/users/users.module';
import { SocketTasks } from './socket.tasks';

@Module({
  imports: [UsersModule, CacheModule.register()],
  providers: [SocketsGateway, SocketTasks],
})
export class SocketsModule {}
