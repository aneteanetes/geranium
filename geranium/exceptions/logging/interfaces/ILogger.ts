namespace geranium.exceptions.logging {
    export interface ILogger {
        log(err: Error);
        get(): string;
    }
}