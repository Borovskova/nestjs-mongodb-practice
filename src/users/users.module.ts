import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { UsersRepository } from './users.repository';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guards/auth-guard';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'users')],
    providers: [UsersService, UsersRepository] ,
    controllers: [UsersController]
})
export class UsersModule {}
