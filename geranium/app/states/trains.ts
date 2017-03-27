class trains extends State {
    get synchronizer() {
        return {
            url: 'get list of trains from .server',
            method: 'post',
            data: {
                command: 'list'
            }
        }
    }

    data: train[] = [];
}

class train {
    name: string;
    stations: number;
    now: number;
}