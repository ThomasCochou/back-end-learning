import { UserMutatationResolver } from './resolvers/user.mutations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService, UserMutatationResolver]
})
export class UserModule {}
