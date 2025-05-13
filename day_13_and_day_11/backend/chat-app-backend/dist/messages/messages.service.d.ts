import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDocument } from './schemas/message.schema';
export declare class MessagesService {
    private messageModel;
    constructor(messageModel: Model<MessageDocument>);
    create(userId: string, createMessageDto: CreateMessageDto): Promise<MessageDocument>;
    findAll(room?: string): Promise<MessageDocument[]>;
}
