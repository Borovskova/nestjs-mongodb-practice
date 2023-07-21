import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserBookmark extends Document  {
  @Prop()
  userId: string;

  @Prop()
  bookmarkId: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  link: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BookmarkSchema = SchemaFactory.createForClass(UserBookmark);
