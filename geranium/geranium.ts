module geranium {
    export async function blossom() {
        var requester = new backend.AjaxRequest(onError);

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
        console.error(err.pure);
    }
}
geranium.blossom();