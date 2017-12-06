export class Exception extends Error {
    private msg: string;
    constructor(msg: string) {
        super(msg);
        this.msg = msg;
        Object.setPrototypeOf(this, Exception.prototype);
    }
    get pure(): string {
        return this.msg;
    }
}