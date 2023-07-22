import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Response,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import jsend from 'jsend';

import { BookmarkService } from './bookmark.service';
import { UserBookmark } from './schemas/bookmark.schema';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark-dto';
import { GetBookmarkDto } from './dto/get-bookmark-dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(
    private _bookmarkService: BookmarkService,
  ) {}

  @Get('list')
  public async getUserBookmarks(
    @Query() query: GetBookmarkDto,
  ): Promise<UserBookmark[]> {
    return this._bookmarkService.getUserBookmarks(
      query.userId,
    );
  }

  @Post('create')
  public async createBookmark(
    @Body() createBookmarkDto: CreateBookmarkDto,
  ): Promise<UserBookmark> {
    return this._bookmarkService.createBookmark(
      createBookmarkDto,
    );
  }

  @Patch(':bookmarkId')
  public async updateBookmark(
    @Param('bookmarkId') bookmarkId: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ): Promise<UserBookmark> {
    return this._bookmarkService.updateBookmark(
      bookmarkId,
      updateBookmarkDto,
    );
  }

  @Delete(':bookmarkId')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  public async deleteBookmark(
    @Response() res: any,
    @Param('bookmarkId') bookmarkId: string,
  ) {
    const deleteBookmark = await this._bookmarkService.deleteBookmark(bookmarkId);

    if (!deleteBookmark) return;
    
    return res.status(HttpStatus.OK).send({
      status: 'success',
      message: `Bookmark with ID ${bookmarkId} has been deleted.`,
    });
  }
}
