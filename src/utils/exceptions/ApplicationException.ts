import { Code, Codes } from "../messages/Codes";
import { BaseException } from "./BaseException";

export class ApplicationException  extends BaseException {

    private readonly _message: string | undefined;
    private readonly _code: Code = Codes.BC_PCH_00002();

    constructor(ex: any, message?: string, code?: Code) {
        super(ex);
        this._message = message;
        if(code){
            this._code = this.code as Code;
        }
    }

    get msg(): string | undefined{
        return this._message;
    }

    get code(): Code | undefined {
        return this._code;
    }

}
