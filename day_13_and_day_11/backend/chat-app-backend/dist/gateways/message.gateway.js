"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../users/user.service");
let MessageGateway = class MessageGateway {
    jwtService;
    usersService;
    logger = new common_1.Logger('MessageGateway');
    userSocketMap = new Map();
    socketUserMap = new Map();
    constructor(jwtService, usersService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    server;
    afterInit() {
        this.logger.log('WebSocket Gateway initialized');
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token?.split(' ')[1];
            if (token) {
                const decoded = this.jwtService.verify(token);
                const userId = decoded.sub;
                this.userSocketMap.set(userId, client.id);
                this.socketUserMap.set(client.id, userId);
                client.join('General');
                await this.usersService.setUserOnlineStatus(userId, true);
                this.server.emit('userStatus', { userId, isOnline: true });
                this.logger.log(`Client connected: ${client.id} (User: ${userId})`);
            }
        }
        catch (e) {
            this.logger.error(`Unauthorized connection: ${client.id}`);
        }
    }
    async handleDisconnect(client) {
        const userId = this.socketUserMap.get(client.id);
        if (userId) {
            this.userSocketMap.delete(userId);
            this.socketUserMap.delete(client.id);
            await this.usersService.setUserOnlineStatus(userId, false);
            this.server.emit('userStatus', { userId, isOnline: false });
        }
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleJoinRoom(client, data) {
        const rooms = Object.keys(client.rooms).filter(room => room !== client.id);
        rooms.forEach(room => client.leave(room));
        client.join(data.room);
        return { event: 'joinedRoom', data: { room: data.room } };
    }
    handleTyping(client, data) {
        const userId = this.socketUserMap.get(client.id);
        if (userId) {
            client.to(data.room).emit('userTyping', {
                userId,
                isTyping: data.isTyping,
            });
        }
    }
};
exports.MessageGateway = MessageGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessageGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "handleTyping", null);
exports.MessageGateway = MessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(8080, {
        cors: {
            origin: '*',
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UsersService])
], MessageGateway);
//# sourceMappingURL=message.gateway.js.map