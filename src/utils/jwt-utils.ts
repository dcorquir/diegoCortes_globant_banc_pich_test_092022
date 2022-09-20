import { AuthException } from './exceptions/AuthException';
const moment = require('moment');

import * as jwtoken from 'jsonwebtoken';
import cfg from '../config/config';

export class JwtUtils {

    static async encodeJwt(data: any, exp_time: number) {
        try {
            moment.locale('mx');
            let key = cfg.jwt.key;
            let date = Date.now();
            let today = new Date();
            data.iat = date;
            today.setMinutes(today.getMinutes() + exp_time);
            data.exp = date + (exp_time*60000);
            return jwtoken.sign(data, key, { algorithm: 'HS512' });
        } catch (er) {
            throw er;
        }
    }

    static decodeJwt(jwt: string) {
        try {
            let key = cfg.jwt.key;
            let data = jwtoken.decode(jwt);
            return data;
        } catch (error) {
            return null;
        }
    }

    static isJwtAlive(jwtData: any): boolean {
        let response = false;
        try {
            if (jwtData.exp >= moment().unix()) {
                response = true;
            }
            return response;
        } catch (err) {
            return response;
        }
    }

    static async getUserSession(jwt: string): Promise<any> {
        return this.getDataJwt(jwt).then(
            (decoded: any) => {
                const user = decoded;
                return user;
            }
        );
    }

    static async getDataJwt(jwt: string): Promise<any> {
        let response = null;
        try {
            let dataJwt = await this.decodeJwt(jwt);
            let isValid = await this.isJwtAlive(dataJwt);
            if (isValid) {
                response = dataJwt != null ? dataJwt : {};
            } else {
                throw new AuthException(new Error(), "Token caduco");
            }
        } catch (error) {
            throw error;
        }
        return response;
    }

    public static verifyJwt(authorization: string) {
        const token = String(authorization).replace('Bearer ', '');
        let key = cfg.jwt.key;
        return jwtoken.verify(token, key, (err, decoded: any) => {
            if (err) {
                throw err;
            }
            return decoded;
        });
    }
}
