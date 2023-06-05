import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema({ collection: 'users' })
export class User {
  @Prop()
  userId: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  age: number;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop([String])
  favoriteFoods: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
