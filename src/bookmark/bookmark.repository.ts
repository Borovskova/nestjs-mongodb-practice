import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Bookmark } from './schemas/bookmark.schema';

@Injectable()
export class BookmarkRepository {
  constructor(
    @InjectModel(Bookmark.name, 'user-bookmarks')
    private _bookmarkModel: Model<Bookmark>,
  ) {}

  public async findOne(
    bookmarkFilterQuery: FilterQuery<Bookmark>,
  ): Promise<Bookmark> {
    return await this._bookmarkModel.findOne(bookmarkFilterQuery);
  }

  public async getAllBookmarks(): Promise<Bookmark[]> {
    return await this._bookmarkModel.find({}).exec();
  }

  public async createBookmark(bookmark: Bookmark): Promise<Bookmark | any> {
    const newBookmark: any = new this._bookmarkModel(bookmark);
    return await newBookmark.save();
  }

  public async updateBookmark(
    bookmarkFilterQuery: FilterQuery<Bookmark>,
    bookmark: Partial<Bookmark>,
  ): Promise<Bookmark> {
    return await this._bookmarkModel.findOneAndUpdate(
      bookmarkFilterQuery,
      bookmark,
      { new: true },
    );
  }

  public async deleteBookmark(
    bookmarkFilterQuery: FilterQuery<Bookmark>,
  ): Promise<any> {
    return await this._bookmarkModel.deleteOne(bookmarkFilterQuery);
  }
}
