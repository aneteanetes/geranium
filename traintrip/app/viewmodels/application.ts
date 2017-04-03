class app extends ViewModel {
    view() {
        return $('._controls').html();
    }

    btn_trip: string = "trip";
    btn_schedule: string = "schedule";

    async show_trip() {
        var tripstate = await State.get(trip);
        debugger;
        tripstate.show('.app');
    }

    show_schedule() {
        new trainschedule()
            .display('.app');
    }

    documentTitle() { return 'Application'; }
}