import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookmarkDocument = Bookmark & Document;
@Schema({ collection: 'bookmarks' })
export class Bookmark  {
  @Prop()
  userId: string;

  @Prop()
  bookmarkId: string;

  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
