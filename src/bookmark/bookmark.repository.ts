import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { UserBookmark } from './schemas/bookmark.schema';

@Injectable()
export class BookmarkRepository {
  constructor(
    @InjectModel(UserBookmark.name)
    private _bookmarkModel: Model<UserBookmark>,
  ) {}

  public async findOne(
    bookmarkFilterQuery: FilterQuery<UserBookmark>,
  ): Promise<UserBookmark> {
    return await this._bookmarkModel.findOne(bookmarkFilterQuery);
  }

  public async getAllBookmarks(): Promise<UserBookmark[]> {
    return await this._bookmarkModel.find({}).exec();
  }

  public async getUserBookmarksList(
    userId: string,
  ): Promise<UserBookmark[]> {
    return await this._bookmarkModel.find({ userId });
  }

  public async createBookmark(
    bookmark: UserBookmark | any,
  ): Promise<UserBookmark> {
    const newBookmark: UserBookmark = new this._bookmarkModel(
      bookmark,
    );
    return await newBookmark.save();
  }

  public async updateBookmark(
    bookmarkFilterQuery: FilterQuery<UserBookmark>,
    bookmark: Partial<UserBookmark>,
  ): Promise<UserBookmark> {
    return await this._bookmarkModel.findOneAndUpdate(
      bookmarkFilterQuery,
      bookmark,
      { new: true },
    );
  }

  public async findOneAndDelete(
    bookmarkFilterQuery: FilterQuery<UserBookmark>,
  ): Promise<Object> {
    return await this._bookmarkModel.findOneAndDelete(
      bookmarkFilterQuery,
    );
  }
}
