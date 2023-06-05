import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Bookmark, BookmarkDocument } from './schemas/bookmark.schema';

@Injectable()
export class BookmarkRepository {
  constructor(
    @InjectModel(Bookmark.name, 'user-bookmarks')
    private _bookmarkModel: Model<BookmarkDocument>,
  ) {}

  public async findOne(
    bookmarkFilterQuery: FilterQuery<Bookmark>,
  ): Promise<Bookmark> {
    return await this._bookmarkModel.findOne(bookmarkFilterQuery);
  }

  public async getAllBookmarks(): Promise<Bookmark[]> {
    return await this._bookmarkModel.find({}).exec();
  }

  public async createBookmark(bookmark: Bookmark): Promise<BookmarkDocument> {
    const newBookmark: BookmarkDocument = new this._bookmarkModel(bookmark);
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
  ): Promise<Object> {
    return await this._bookmarkModel.deleteOne(bookmarkFilterQuery);
  }
}
