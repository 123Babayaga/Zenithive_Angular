import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/user.service';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: any): Promise<{
        userId: any;
        email: any;
        username: any;
    }>;
}
export {};
