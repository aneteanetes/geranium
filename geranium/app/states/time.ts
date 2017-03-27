class time extends ViewState {
    view() {
        return '<span data-field="time">{{time}}</span>';
    }

    get synchronizer() {
        return {
            url: 'get time from .server',
            method: 'post'
        };
    }

    time: string = "00:00:00";
}