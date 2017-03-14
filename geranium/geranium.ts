module geranium {
    export async function blossom() {
    }
}

import appSettings = geranium.runtime.AppSettings;
appSettings.Current.init({
	validreport: new MaterializeValidationRepoter()
});


new TimeViewState('.servertime');
setInterval(() => {
    geranium.runtime.AppSettings.Current.request.raise();
}, 1100);