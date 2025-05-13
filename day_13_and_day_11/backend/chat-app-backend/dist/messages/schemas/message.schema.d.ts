import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/users.schema';
export type MessageDocument = Message & Document;
export declare class Message {
    _id: Types.ObjectId;
    content: string;
    sender: User | Types.ObjectId;
    room: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const MessageSchema: mongoose.Schema<Message, mongoose.Model<Message, any, any, any, Document<unknown, any, Message, any> & Message & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Message, Document<unknown, {}, mongoose.FlatRecord<Message>, {}> & mongoose.FlatRecord<Message> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
