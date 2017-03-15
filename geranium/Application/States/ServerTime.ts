import State = geranium.states.State;
class ServerTime extends State {
    time: string = "12:15:16";
    autoupdate() {
        return {
            url: '/server.s',
            method: 'post'
        };
    }
}