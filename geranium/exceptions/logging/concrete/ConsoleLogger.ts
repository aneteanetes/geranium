namespace geranium.exceptions {
    export class ConsoleLogger implements logging.ILogger {
        private logOflog: string = "";
        log(err: Error) {
            this.logOflog += err.message;
            console.log("Application error: " + err.message);
        }
        get(): string {
            return this.logOflog;
        }
    }
}