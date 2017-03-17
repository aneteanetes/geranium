module geranium {
    export async function blossom() {
    }
}
//application initialization
import appSettings = geranium.runtime.AppSettings;
appSettings.Current.init({
    validreport: new MaterializeValidationRepoter()
});
appSettings.Current.bidnings.push(CollectionBinding);


//my states/viewstates
new TimeViewState('.servertime');
new TrainTrip();

//my viewmodels
var controls = new Controls();
controls.display('.controlpanel');

//some application logic
State.get(ServerTime).bind = (x: ServerTime) => {
    if (x.time.substring(7) == "0") {
        var app = appSettings.Current.router.Current<App>();

        if (app != undefined) {
            if (app != null && app.now != app.max) {
                app.now++;
                if (app.now == app.max)
                    Materialize.toast('Train finished!', 10000, 'green');
            }
        }
    }
}

setInterval(() => {
    geranium.runtime.AppSettings.Current.request.raise();
}, 1100);

$(function () {
    $('.collapsible').collapsible();
})