import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { MessageGateway } from '../gateways/message.gateway';
import { Request } from 'express';
interface AuthRequest extends Request {
    user: {
        userId: string;
    };
}
export declare class MessagesController {
    private readonly messagesService;
    private readonly messageGateway;
    constructor(messagesService: MessagesService, messageGateway: MessageGateway);
    create(createMessageDto: CreateMessageDto, req: AuthRequest): Promise<import("./schemas/message.schema").MessageDocument>;
    findAll(room?: string): Promise<import("./schemas/message.schema").MessageDocument[]>;
}
export {};
