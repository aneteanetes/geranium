import State = geranium.states.State;
class ServerTime extends State {
    time: string = "00:00:01";
    autoupdate() {
        return {
            url: '/server.s',
            method: 'post'
        };
    }
}