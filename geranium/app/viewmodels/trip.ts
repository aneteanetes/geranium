
class trip extends ViewModel {
    constructor(routes?:any[]) {
        super();
        this.init(routes);
    }

    private async init(routes?: any[]) {
        var trainState = State.get(trains);
        if (!trainState)
            trainState = new trains();

        await trainState.sync();

        var selected: train;
        if (!routes)
            selected = trainState.data[0];
        else
            selected = trainState.data.filter(x => x.name == routes[0])[0];

        this.obtain(selected);
    }

    view() {
        return $('._trip').html();
    }

    name: string = "";
    stations: number = 0;

    _now: number = 0;
    get now(): number {
        this.progressBar();
        return this._now;
    }
    set now(val: number) {
        this._now = val;
        this.progressBar();
    }

    jumpto: number = 0;

    increment() {
        this.now++;
    }
    decrement() {
        this.now--;
    }
    jump() {
        this.now = parseInt(this.jumpto as any);
    }

    progressBar() {
        let percentage = this._now / this.stations * 100;
        $('.determinate').css('width', percentage.toString() + '%');
    }

    documentTitle() { return 'Train trip'; }

    validators: IValidator[] = [
        new TypeValidator("now", "number"),
        new NotLessThenZeroValidator("now"),
        new RangeValidator("now", 0, 10, false),
    ];
}