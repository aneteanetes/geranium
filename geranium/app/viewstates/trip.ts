@Routeroot({ executable: "show" })
class trip extends ViewState {
    view() {
        return $('._trip').html();
    }

    async show(selector: string) {
        debugger;
        if (!this.name) {
            var _trains = await State.get(trains);
            this.obtain(_trains.data[0]);                
        }
        super.show(selector);
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
        new geranium.validating.validator.RangeValidator("now", 0, "stations", false),
        new geranium.validating.validator.TypeValidator("now", "number"),
        new geranium.validating.validator.NotLessThenZeroValidator("now")
    ];
}