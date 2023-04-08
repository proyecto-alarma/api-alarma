

import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ResponseBase } from 'src/common/model/response-base.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtServices extends PassportStrategy(Strategy) {
    constructor(
        private readonly jwt: JwtService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.keyjwt,

        });
    }

    create(createConfigurationDto: any) {
        const payload = { ...createConfigurationDto };
        return {
            access_token: this.jwt.sign(payload),
        };
    }

    
    async validate(payload: any) {
        console.log(payload);

        return { ...payload };
    }




    async decodeToken(token: string) {
        try {
            let d = await this.jwt.verify(token, {
                secret: process.env.keyjwt,
            });
            return d;
        } catch (error) {
            console.log("aaaaa");

            return new ResponseBase('400', 'token no valido.', {});

        }
    }
}