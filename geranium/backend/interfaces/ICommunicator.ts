namespace geranium.backend.interfaces {
    export interface ICommunicator {
        send<TRequest>(data: TRequest);
        recive<TResponse>(): TResponse;
    }
}