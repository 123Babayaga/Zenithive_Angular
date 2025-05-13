import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/user.service';
export declare class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    private usersService;
    private logger;
    private userSocketMap;
    private socketUserMap;
    constructor(jwtService: JwtService, usersService: UsersService);
    server: Server;
    afterInit(): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleJoinRoom(client: Socket, data: {
        room: string;
    }): {
        event: string;
        data: {
            room: string;
        };
    };
    handleTyping(client: Socket, data: {
        room: string;
        isTyping: boolean;
    }): void;
}
