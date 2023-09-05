import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { BookmarkRepository } from './bookmark.repository';
import {
  UserBookmark,
  BookmarkSchema,
} from './schemas/bookmark.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserBookmark.name, schema: BookmarkSchema },
    ]),
    UsersModule,
  ],
  providers: [BookmarkService, BookmarkRepository],
  controllers: [BookmarkController],
  exports: [BookmarkService, BookmarkRepository],
})
export class BookmarkModule {}
