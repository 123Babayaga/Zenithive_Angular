import { Model } from 'mongoose';
import { UserDocument } from './schemas/users.schema';
import { UpdateUserDto } from '../auth/dto/auth.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findByEmail(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDocument | null>;
    create(username: string, email: string, password: string): Promise<UserDocument>;
    update(userId: string, updateUserDto: UpdateUserDto): Promise<UserDocument>;
    findAllUsers(): Promise<UserDocument[]>;
    setUserOnlineStatus(userId: string, isOnline: boolean): Promise<void>;
}
