import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { BookmarkRepository } from './bookmark.repository';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmark } from './schemas/bookmark.schema';
import { UpdateBookmarkDto } from './dto/update-bookmark-dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly _bookmarkRepository: BookmarkRepository) {}

  public async getUserBookmarks(userId: string): Promise<Bookmark[]> {
    const allBookmarks = await this._bookmarkRepository.getAllBookmarks();
    let userBookmarks: Array<Bookmark> = [];

    if (allBookmarks && allBookmarks.length) {
      allBookmarks.forEach((bookmark) => {
        bookmark.userId === userId ? userBookmarks.push(bookmark) : null;
      });
    }
    return userBookmarks;
  }

  public async createBookmark(
    createBookmarkDto: CreateBookmarkDto,
  ): Promise<Bookmark> {
    let findBookmark = await this._bookmarkRepository.findOne({
      title: createBookmarkDto.title,
    });
    if (findBookmark) {
      throw new HttpException(
        'User already have bookmark with rhis title',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this._bookmarkRepository.createBookmark({
      bookmarkId: uuidv4(),
      userId: createBookmarkDto.userId,
      title: createBookmarkDto.title,
      description: createBookmarkDto.description,
    });
  }

  public async updateBookmark(
    bookmarkId: string,
    bookmarkUpdates: UpdateBookmarkDto,
  ): Promise<Bookmark> {
    let findBookmark = await this._bookmarkRepository.findOne({
      title: bookmarkUpdates.title,
    });
    if (!findBookmark) {
      throw new HttpException(
        'Bookmark does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this._bookmarkRepository.updateBookmark(
      { bookmarkId },
      bookmarkUpdates,
    );
  }

  public async deleteBookmark(bookmarkId: string): Promise<any> {
    let findBookmark = await this._bookmarkRepository.findOne({
      bookmarkId: bookmarkId,
    });
    if (!findBookmark) {
      throw new HttpException(
        'Bookmark does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this._bookmarkRepository.deleteBookmark({ bookmarkId });
  }
}
