module geranium {
    export async function blossom() {
    }
}
//application initialization
import appSettings = geranium.runtime.AppSettings;
appSettings.Current.init({
    validreport: new MaterializeValidationRepoter()
});
//appSettings.Current.bidnings.length = 0;

var apps = new App();
apps.display('.app');


//my states/viewstates
new TimeViewState('.servertime');

//my viewmodels
var controls = new Controls();
controls.display('.controlpanel');

//some application logic
State.get(ServerTime).bind = (x: ServerTime) => {
    if (x.time.substring(7) == "0") {
        var app = appSettings.Current.router.Current<App>()
        if (app != null)
            app.now++;
    }
};

setInterval(() => {
    geranium.runtime.AppSettings.Current.request.raise();    
}, 1100);