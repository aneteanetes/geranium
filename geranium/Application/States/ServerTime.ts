import state = geranium.states.State;
class ServerTime extends state {
    time: string = "12:15:16";
    autoupdate() {
        return {
            url: '/server.s',
            method: 'post'
        };
    }
}