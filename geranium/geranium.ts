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

	function routePath(obj: any, routes: string[]): string[] {
		if (routes == null)
			routes = [];

		if (obj == null)
			return null;

		var route = obj.constructor.name;
		if (route == "Object")
			return null;
		
		routes.push(obj.constructor.name);
		obj = Object.getPrototypeOf(obj);
		routes.concat(routePath(obj, routes));
		return routes;
	}


	var _routes: { route: string, ctor: { new (): any } }[] = [];

	function routed1(constructor: any) {
		var instance = new constructor() as Pages;

		var route = routePath(instance, null)
			.removeSame()
			.reverse()
			.join("/");

		_routes.push({ route: "/" + route, ctor: constructor });
    }    
	
    interface IHashPage {
        readonly html: string;
        readonly page: number;
        show();
	}

	@geranium.routing.abstract.Router.routed
    abstract class Pages implements IHashPage {
        abstract readonly html: string;
        abstract readonly page: number;
        show() {
            $('.viewmodel').jhtml($(this.html));
        }
	}

	class Page1 extends Pages {
        html: string = "<h1>Page1</h1>";
        page: number = 1;
	}

	class Page2 extends Pages {
        html: string = "<a href='3'>Page2</a>";
        page: number = 2;
    }
    
	export async function blossom() {

		//window.onload = x => {
		//	debugger;
		//	var routing = _routes.filter(x => x.route == window.location.pathname);
		//	if (routing.length > 0) {
		//		var instance = new routing[0].ctor();
		//		instance.show();
		//	}
		//};
   //     window.onpopstate = function (event) {
   //         var ctor = _history.filter(x => x.name == event.state)[0];
			//var instance = new ctor() as Pages;
   //         instance.show();
   //     };

        console.log(window.location.pathname);

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