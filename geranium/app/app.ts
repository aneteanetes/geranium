appSettings.init({
    validreport: new MaterializeValidationRepoter()
});

$(document).ready(x => {
    new time('.time');
    setInterval(() => {
        State.get(time).sync();
    }, 1100);

    new app().display('.controls');
});