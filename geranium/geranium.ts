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
            return html;
        }
    }
    
    @routing.BasicRouter.routeroot
    class app extends viewmodels.abstract.ViewModel {
        constructor(route?: string) {
            super();
            if (route) {
                console.log('train is:' + route[0]);
                console.log('requested station info is:' + route[2]);

                console.log(arguments);
            }            
        }

        documentTitle() {
            return 'Application';
        }

        name: string;
        pwd: string;

        go() {
            var _red = new red();
            _red.display('.app');
        }

        autoupdate() { return false; }
        view(): any { return loginView; }
    }


    class staticView extends view.abstract.View {
        declare(): string {
            return '<h1>This is static route with param: {{param}}</h1><br><button onclick="next">next</button>';
        }
    }
    
    abstract class state extends viewmodels.abstract.ViewModel {
        param: string;

        abstract nextItem(): string;

        constructor(routes?: string[]) {
            super();
            if (routes) {
                this.param = routes[0];
            }
        }

        next() {
            var item = this.nextItem();

            if (item == 'blue') {
                var _blue = new blue();
                _blue.display('.app');
            } else {
                console.log('end');
            }
        }

        autoupdate() { return false; }
        view(): any { return staticView; }
    }
    @routing.BasicRouter.routed
    class blue extends state {
        constructor() {
            super();
            this.param = 'blue';
        }
        nextItem() { return 'login'; }
        documentTitle() { return 'violets are blue'; }
    }
    @routing.BasicRouter.routed
    class red extends state {
        constructor() {
            super();
            this.param = 'red';
        }
        nextItem() { return 'blue'; }
        documentTitle() { return 'roses are red'; }
    }
    
    export async function blossom() {        
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