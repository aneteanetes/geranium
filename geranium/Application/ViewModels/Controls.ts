class Controls extends ViewModel {
    view() { return ControlPanel; }

    scheduleBtnName: string = 'schedule';
    aboutBtnName: string = 'trip';

    schedule() {
        var schedule = new Schedule();
        schedule.display('.app');
    }
    about() {
        var app = new App();
        app.display('.app');
    }

    autoupdate() {
        return false;
    }
}