import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { SocketsModule } from './sockets/sockets.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/nestdb', {
      connectionName: 'users',
    }),
    MongooseModule.forRoot('mongodb://localhost/nestdb', {
      connectionName: 'user-bookmarks',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    AuthModule,
    BookmarkModule,
    SocketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
