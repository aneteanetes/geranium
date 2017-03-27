
class app extends ViewModel {
    constructor(routes?: any[]) {
        super();
        this.show_trip();
    }

    view() {
        return $('._controls').html();
    }

    btn_trip: string = "trip";
    btn_schedule: string = "schedule";

    show_trip() {
        new trip().display('.app');
    }

    show_schedule() {
        console.log('schedule vm');
    }

    documentTitle() { return 'Application'; }
}