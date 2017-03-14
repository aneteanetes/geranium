module geranium.history {
    export function is(constructor: any): boolean {
        var router = runtime.AppSettings.Current.router;
        return router.routes.filter(x => {
            var instance = new x.ctor();
            return instance.constructor.name == constructor.name;
        }).length > 0;
    }
}