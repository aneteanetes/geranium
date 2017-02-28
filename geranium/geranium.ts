module geranium {
    export async function blossom() {
        var uri = 'ws://' + window.location.hostname + ':58004/handler.ashx'; 
        var requester = new backend.WebSocketRequest(uri,onError);

        var first: number = 5;
        var opts = {
            url: '/test.q',
            method: 'POST',
            data: { n: first }
        };
        var second = await requester.send<number>(opts);
        opts.data.n = second;
        var third = await requester.send<number>(opts);

        console.log(first);
        console.log(second);
        console.log(third);
    }
    function onError(err: exceptions.Exception) {
        console.error(err);
    }
}
geranium.blossom();