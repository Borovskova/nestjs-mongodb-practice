import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { BookmarkRepository } from './bookmark.repository';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UserBookmark } from './schemas/bookmark.schema';
import { UpdateBookmarkDto } from './dto/update-bookmark-dto';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class BookmarkService {
  constructor(
    private readonly _bookmarkRepository: BookmarkRepository,
    private _usersService:UsersService,
  ) {}

  public async getUserBookmarks(
    userId: string,
  ): Promise<UserBookmark[]> {
    const user = await this._usersService.getUser(userId)
    if(!user) return

    const allBookmarks =
      await this._bookmarkRepository.getAllBookmarks();
    let userBookmarks: Array<UserBookmark> = [];

    if (allBookmarks && allBookmarks.length) {
      allBookmarks.forEach((bookmark) => {
        bookmark.userId === userId
          ? userBookmarks.push(bookmark)
          : null;
      });
    }
    return userBookmarks;
  }

  public async createBookmark(
    createBookmarkDto: CreateBookmarkDto,
  ): Promise<UserBookmark> {
    
    const user = await this._usersService.getUser(createBookmarkDto.userId)
    if(!user) return

    let findBookmark =
      await this._bookmarkRepository.findOne({
        title: createBookmarkDto.title,
        userId: createBookmarkDto.userId
      });

    if (findBookmark) {
      throw new HttpException(
        'User already have bookmark with rhis title',
        HttpStatus.BAD_REQUEST,
      );
    }
 
    return this._bookmarkRepository.createBookmark(
      {
        userId: createBookmarkDto.userId,
        title: createBookmarkDto.title,
        description:
          createBookmarkDto.description,
        link: createBookmarkDto.link,
      },
    );
  }

  public async updateBookmark(
    bookmarkId: string,
    bookmarkUpdates: UpdateBookmarkDto,
  ): Promise<UserBookmark> {
    let findBookmark =
      await this._bookmarkRepository.findOne({
        _id: bookmarkId,
      });
    if (!findBookmark) {
      throw new HttpException(
        'Bookmark does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const bookmarkUpdatesParsed = {
      ...bookmarkUpdates,
    };
    return await this._bookmarkRepository.updateBookmark(
      { _id: bookmarkId },
      bookmarkUpdatesParsed,
    );
  }

  public async deleteBookmark(
    bookmarkId: string,
  ): Promise<Object> {

    let deleteBookmark =
      await this._bookmarkRepository.findOneAndDelete({
        _id: bookmarkId,
      });
    if (!deleteBookmark) {
      throw new HttpException(
        'Bookmark does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    return true
  }
}
