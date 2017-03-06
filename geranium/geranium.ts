module geranium {

    function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {

    }
    class fuckidate extends Function {
        constructor(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
            super();
            console.log("yes, you can use class as fucking decorator, because prototypes etc");
        }
    }


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
    
    export async function blossom() {
        var modelFromServer = {
            max: 25,
            now: 1
        };

        var _vm = new vm();
        _vm.obtain(JSON.stringify(modelFromServer));
        _vm.display('.viewmodel');


        var ts = new timestate();
        ts.bind = (x: timestate) => {
            debugger;
            if (x.time.substring(7) == "0")
                _vm.now++;
        };
        var _vs = new vs('.viewstate');
        setInterval(() => {
            runtime.AppSettings.Current.request.trigger();
        }, 1100);
    }
}
geranium.blossom();