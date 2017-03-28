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

    static async incrementTripState() {
        var timest = await State.get(time);

        if (timest.time.substring(7) == "0") {
            let tripst = await State.get(trip);
            var endOfTrip = function () {
                return tripst.now == tripst.stations
            };

            if (!endOfTrip()) {
                tripst.now++;
                if (endOfTrip())
                    Materialize.toast('The "' + tripst.name + '" reached its destination!', '10000', 'blue');
            }
        }
    }
}