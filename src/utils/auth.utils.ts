import { UserSessionDTO } from './../services/api/dto/request/UserSessionDTO';
import { Code, Codes } from './messages/Codes';

export class AuthUtils {

    static validateAuthorization(user_session: UserSessionDTO): Code {
        let code = !user_session ? Codes.BC_PCH_00003 : null;
        return code as unknown as Code;
    }

}