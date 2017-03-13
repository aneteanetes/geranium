module geranium {
    class H1 extends view.abstract.View {
        declare(): string { return '<h1 data-field="time">{{time}}</h1>'; }
    }
    class timestate extends states.State {
        time: string = "12:15:16";
        autoupdate() {
            return {
                url: '/server.s',
                method: 'post'
            };
        }
    }
    class vs extends viewstate.ViewState {
        state(): any { return timestate; }
        view(): any { return H1; }
    }

    class v extends view.abstract.View {
        declare(): string {
            var html = $('.template').html();
            $('.template').remove();
            debugger;
            return html;
        }
    }    

    @routing.abstract.Router.routed
    class vm extends viewmodels.abstract.ViewModel {
        max: number = 10;
        now: number = 0;
        jumpto: number = 0;

        maxincrement() {
            this.max++;
        }
        maxdecrement() {
            this.max--;
        }
        increment() {
            this.now++;
        }
        decrement() {
            this.now--;
        }
        jump() {
            this.now = this.jumpto;
        }

        autoupdate() { return false; }
        view(): any { return v; }
    }    



    class loginView extends view.abstract.View {
        declare(): string {
            var html = $('.loginForm').html();
            $('.loginForm').remove();
            return html;
        }
    }

    @routing.BasicRouter.routed
    @routing.BasicRouter.routeroot
    class app extends viewmodels.abstract.ViewModel {
        constructor(route: string) {
            super();
            if (route) {
                console.log('train is:' + route[0]);
                console.log('requested station info is:' + route[2]);

                console.log(arguments);
            }
        }

        name: string;
        pwd: string;

        go() {
            console.log('go');
        }

        autoupdate() { return false; }
        view(): any { return loginView; }
    }


    class staticView extends view.abstract.View {
        declare(): string {
            return '<h1>This is static route with param: {{param}}</h1>';
        }
    }
    @routing.BasicRouter.routed
    class state extends viewmodels.abstract.ViewModel {
        param: string;

        constructor(routes: string[]) {
            super();
            debugger;
            if (routes) {
                this.param = routes[0];
            }
        }

        autoupdate() { return false; }
        view(): any { return staticView; }
    }
    @routing.BasicRouter.routed
    class red extends state {

    }
    @routing.BasicRouter.routed
    class blue extends state {

    }
    
    export async function blossom() {
        

        //// добавить состояние истории
        //history.pushState({ page: 1 }, "title 1", "?page=1");
        //history.pushState({ page: 2 }, "title 2", "?page=2");

        //// заменить текущее состояние
        //history.replaceState({ page: 3 }, "title 3", "?page=3");

        //history.back(); // location: http://example.com/example.html?page=1, state: {"page":1}
        //history.back(); // location: http://example.com/example.html, state: null
        //history.go(2);  // location: http://example.com/example.html?page=3, state: {"page":3}

        //console.log(history.state) // Object {page: 3}

        //var modelFromServer = {
        //    max: 25,
        //    now: 1
        //};

        //var _vm = new vm();
        //_vm.obtain(JSON.stringify(modelFromServer));
        //_vm.validators.push(new validating.validator.NotZeroValidator("now"));
        //_vm.display('.viewmodel');
        
        //var ts = new timestate();
        //ts.bind = (x: timestate) => {
        //    if (x.time.substring(7) == "0")
        //        _vm.now++;
        //};
        //var _vs = new vs('.viewstate');
        //setInterval(() => {
        //    runtime.AppSettings.Current.request.raise();
        //}, 1100);

        //evalx = new evalMe();
    }
}
geranium.blossom();