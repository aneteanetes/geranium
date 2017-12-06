export class ViewModelHistoryState {
    ctor: any;
    selector: string;

    constructor(fields?: {
        ctor?: any,
        selector?: string
    }) {
        if (fields) {
            Object.assign(this, fields);
        }
    }
}