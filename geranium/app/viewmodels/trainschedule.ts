@Routed({ prepath: "fuckyou" })
class trainschedule extends ViewModel {
    view() { return $('._trainschedule').html(); }

    async display(selector: string) {
        var trainsst = await State.get(trains);
        this.trains = trainsst.data;
        await super.display(selector);
        $('.collapsible').collapsible();
    }

    async change_train(name: string) {
        var tripst = await State.get(trip);
        if (!tripst.availableForChanges()) {
            Materialize.toast('You are on the way!', 1500, 'red');
            return;
        }

        var selected_train = this.trains.filter(x => x.name == name)[0];
        tripst.obtain(selected_train);
        tripst.show('.app');
    }

    trains: Array<train> = [];
}