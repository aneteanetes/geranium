module geranium.viewDOM {
    export class JQueryViewDOM extends abstract.ViewDOM {
        private _$html: JQuery;
        getViewDOM(): JQuery {
            if (this._$html == null)
                this._$html = $(this.view.html);
            return this._$html;
        }
    }
}