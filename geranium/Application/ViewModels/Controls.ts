class Controls extends vm {
    view() { return ControlPanel; }

    scheduleBtnName: string = 'schedule';
    aboutBtnName: string = 'about';

    schedule() {
        console.log('schedule viewmodel');
    }
    about() {
        console.log('about');
    }

    autoupdate() {
        return false;
    }
}