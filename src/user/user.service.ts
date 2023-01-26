import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateOutput, UserCreateInput } from './dto/user-create.dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async userCreate(input: UserCreateInput) : Promise<UserCreateOutput> {
        const user = this.userRepository.create(input);
        await user.save()
        return {user};
    }

    async userGet(email : User["email"]) : Promise<User> {
        return await this.userRepository.findOneOrFail({email});
    }
}
