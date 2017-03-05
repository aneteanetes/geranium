module geranium {
    
    class Count extends models.abstract.Model {
        max: number = 10;
        now: number = 0;
        autoupdate() { return false; }
    }
    class ProgressBar extends view.abstract.View {
        declare(): string {
            return '<h1>{{now}} of {{max}}</h1>';
        }
    }
    class AlmostViewModel extends view.abstract.ViewPublisher {
        view(): any { return ProgressBar;}
    }

    class TimeState extends states.State {
        time: '00:00';
        autoupdate() {
            return {
                url: '/server.s',
                method: 'post'
            };
        }
    }
    class H1 extends view.abstract.View {
        declare(): string {
            return '<h1>{{time}}</h1>';
        }
    }
    class TimeVision extends viewstate.ViewState {
        state(): any { return TimeState; }
        view(): any { return H1; }
    }

    export async function blossom() {
        new TimeVision($('.viewstate'));
        setInterval(() => {
            runtime.AppSettings.Current.request.trigger();
        }, 1000);


        var countmodelfromserver = new Count();
        countmodelfromserver.now = 2;

        var amv = new AlmostViewModel($('.viewmodel'));
        amv.publish(countmodelfromserver);
        countmodelfromserver.trigger(countmodelfromserver);

        setTimeout(() => {
            countmodelfromserver.obtain(JSON.stringify({ now: 9 }));
        }, 2500);
    }
}
geranium.blossom();