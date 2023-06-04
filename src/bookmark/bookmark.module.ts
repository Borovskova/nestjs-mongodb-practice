import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { BookmarkRepository } from './bookmark.repository';
import { Bookmark, BookmarkSchema } from './schemas/bookmark.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Bookmark.name, schema: BookmarkSchema }], 'user-bookmarks')],
  providers: [BookmarkService, BookmarkRepository],
  controllers: [BookmarkController],
  exports: [BookmarkService]
})
export class BookmarkModule {}
