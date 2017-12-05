import { ICommunicator } from "../../interfaces/ICommunicator";
import { CommunicationException } from "../../../exceptions/backend/CommunicationException";

export class AjaxCommunicator extends ICommunicator {
    private innerPromise: Promise<any>;

    send<TRequest extends XHRSettings>(data: TRequest): Promise<void> {
        this.validate(data);

        return new Promise<void>((resolve, reject) => {
            this.innerPromise = new Promise((resolve, reject) => {
                try {
                    let xhr = new XMLHttpRequest();
                    this.setContentType(data, xhr);
                    xhr.open(data.method, data.url, data.async, data.user, data.pasw);

                    xhr.onload = function () {
                        if (xhr.status >= 200 && xhr.status < 400) {
                            resolve(xhr.responseText);
                        } else {
                            reject(`${xhr.status}: ${xhr.statusText}`);
                        }
                    };

                    xhr.onerror = function () {
                        reject(`${xhr.status}: ${xhr.statusText}`);
                    }
                } catch (ex) {
                    throw new CommunicationException(ex);
                }
            });
        })
    }

    async recive<TResponse>(): Promise<TResponse> {
        return this.innerPromise;
    }

    private validate(data: XHRSettings) {
        if (!data.method || !data.url) {
            throw new CommunicationException("XHR request must declare method and url!");
        }
    }

    private setContentType(opt: XHRSettings, xhr: XMLHttpRequest) {
        if (opt.method != "GET") {
            xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded; charset=UTF-8');
        }
    }
}

export interface XHRSettings {
    method?: HttpMethod;
    url?: string;
    async?: boolean;
    user?: string;
    pasw?: string;
    data?: any
}

type HttpMethod = keyof { GET, POST, PUT, PATCH, DELETE };