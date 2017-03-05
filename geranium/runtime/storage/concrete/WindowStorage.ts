module geranium.runtime {
    export class WindowStorage extends abstract.LoggedStorage {
        protected variable: string = "";
        constructor(storageName: string) {
            super();
            this.variable = storageName;
        }

        private get collection(): any[] {
            if (window[this.variable] == null)
                window[this.variable] = new Array();
            return window[this.variable] as any[];
        }

        add(model: any): boolean {
            try {
                this.collection.push(model);
                return true;
            } catch (ex) {
                this.log(ex);
                return false;
            }
        }
        remove<T>(type: { new (...args: any[]): T }): boolean {
            try {
                var model = this.searchFor(type);
                if (model != null)
                    window[this.variable] = this.collection.remove(model);
                return true;
            } catch (ex) {
                this.log(ex);
                return false;
            }
        }
        get<T>(type: { new (...args: any[]): T }): T { return this.searchFor(type); }

        private searchFor<T>(ctor: { new (...args: any[]): T }): any {
            var enumerable = this.collection
                .filter(x => x instanceof ctor);
            if (enumerable.length > 0)
                return enumerable[0];
            return null;
        }
    }
}