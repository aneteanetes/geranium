class trip extends ViewState {
    view() {
        return $('._trip').html();
    }

    name: string = "";
    stations: number = 0;

    private _now: number = 0;
    get now(): number {
        this.progressBar();
        return this._now;
    }
    set now(val: number) {
        this._now = val;
        this.progressBar();
    }

    availableForChanges(): boolean{
        return this._now == this.stations;
    }

    obtain(data: any) {
        debugger;
        super.obtain(data);
        this.validators = this.validators.filter(x => x.constructor.name != 'RangeValidator');
        this.validators.push(
            new RangeValidator("now", 0, this.stations, false),
        );
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
        new NotLessThenZeroValidator("now")
    ];
}