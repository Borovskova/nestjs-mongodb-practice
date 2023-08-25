import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { BookmarkRepository } from './bookmark.repository';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UserBookmark } from './schemas/bookmark.schema';
import { UpdateBookmarkDto } from './dto/update-bookmark-dto';
import { UsersService } from 'src/users/user.service';
import { generateExcel } from 'src/helpers/exel.helper';

@Injectable()
export class BookmarkService {
  constructor(
    private readonly _bookmarkRepository: BookmarkRepository,
    private _usersService: UsersService,
  ) {}

  public async getUserBookmarks(
    userId: string,
    objectOnly:boolean = false
  ): Promise<UserBookmark[]> {
    const user = await this._usersService.getUser(userId);
    if (!user) return;

    const userBookmarks =
      await this._bookmarkRepository.getUserBookmarksList(userId, objectOnly);
    return userBookmarks;
  }

  public async createBookmark(
    createBookmarkDto: CreateBookmarkDto,
  ): Promise<UserBookmark> {
    const user = await this._usersService.getUser(
      createBookmarkDto.userId,
    );
    if (!user) return;

    let findBookmark = await this._bookmarkRepository.findOne({
      title: createBookmarkDto.title,
      userId: createBookmarkDto.userId,
    });

    if (findBookmark) {
      throw new HttpException(
        'User already have bookmark with rhis title',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this._bookmarkRepository.createBookmark({
      userId: createBookmarkDto.userId,
      title: createBookmarkDto.title,
      description: createBookmarkDto.description,
      link: createBookmarkDto.link,
    });
  }

  public async updateBookmark(
    bookmarkId: string,
    bookmarkUpdates: UpdateBookmarkDto,
  ): Promise<UserBookmark> {
    let findBookmark = await this._bookmarkRepository.findOne({
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

  public async deleteBookmark(bookmarkId: string): Promise<Object> {
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

    return true;
  }

  public async getUserBookmarksListAsExel(
    userId: string,
  ): Promise<any> {
    const user = await this._usersService.getUser(userId);
    if (!user) return;
    const userBookmarksList = await this.getUserBookmarks(userId, true);
    const buffer = await generateExcel(userBookmarksList);

    return {
      buffer: buffer,
      user: user,
    };
  }
}
