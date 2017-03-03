module geranium {

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
        new TimeVision($('body'));
        setInterval(() => {
            debugger;
            runtime.AppSettings.Current.request.trigger();
        }, 5);
    }
}
geranium.blossom();