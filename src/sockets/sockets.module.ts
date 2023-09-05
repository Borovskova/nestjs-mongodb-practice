import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { SocketsGateway } from './sockets.gateway';
import { UsersModule } from 'src/users/users.module';
import { SocketTasks } from './socket.tasks';
import { BookmarkModule } from 'src/bookmark/bookmark.module';

@Module({
  imports: [UsersModule, BookmarkModule, CacheModule.register()],
  providers: [SocketsGateway, SocketTasks],
})
export class SocketsModule {}
