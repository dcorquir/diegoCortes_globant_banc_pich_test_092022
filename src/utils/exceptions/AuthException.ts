import { BaseException } from "./BaseException";

export class AuthException  extends BaseException {

    private readonly _message: string | undefined;

    constructor(ex: any, message?: string) {
        super(ex);
        this._message = message;
    }

    get msg(): string | undefined {
        return this._message;
    }
}
