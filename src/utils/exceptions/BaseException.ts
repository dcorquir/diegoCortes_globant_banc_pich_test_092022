export abstract class BaseException extends Error {
    constructor(ex: any) {
        super(ex);
    }
}
