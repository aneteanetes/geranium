class trains extends State {
    get synchronizer() {
        if (this.data.length==0)
            return {
                url: 'get list of trains from .server',
                method: 'post',
                data: {
                    command: 'list'
                }
            }
        else
            return undefined;
    }

    data: train[] = [];
}

class train {
    name: string;
    stations: number;
    now: number;
}