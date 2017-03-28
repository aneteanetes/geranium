appSettings.init({
    validreport: new MaterializeValidationRepoter()
});

async function entry() {
    var timest = await State.get(time);
    await timest.show('.time');

    setInterval(time.incrementTripState, 1100);

    new app().display('.controls');
}

$(document).ready(x => {
    entry();
});