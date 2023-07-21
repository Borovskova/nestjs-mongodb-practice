import { Body, Controller, Post, Get, Query, Patch, Param, Delete } from '@nestjs/common';

import { BookmarkService } from './bookmark.service';
import { UserBookmark } from './schemas/bookmark.schema';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark-dto';

@Controller('bookmark')
export class BookmarkController {

    constructor(private _bookmarkService:BookmarkService) {}

    @Get('list')
    public async getUserBookmarks(@Query() query: {userId:string}): Promise<UserBookmark[]> {
      return this._bookmarkService.getUserBookmarks(query.userId);
    }

    @Post('create')
    public async createBookmark(@Body() createBookmarkDto: CreateBookmarkDto): Promise<UserBookmark> {
      return this._bookmarkService.createBookmark(createBookmarkDto);
    }

    @Patch(':bookmarkId')
    public async updateBookmark(@Param('bookmarkId') bookmarkId: string, @Body() updateBookmarkDto: UpdateBookmarkDto): Promise<UserBookmark> {
      return this._bookmarkService.updateBookmark(bookmarkId, updateBookmarkDto);
    }

    @Delete(':bookmarkId')
    public async deleteBookmark(@Param('bookmarkId') bookmarkId: string): Promise<Object> {
      return this._bookmarkService.deleteBookmark(bookmarkId);
    }
}
