import ViewModel = geranium.viewmodels.abstract.ViewModel;
import router = geranium.routing.abstract.Router;
import ValidationResult = geranium.validating.contracts.ValidationResult;
import IValidator = geranium.validating.validator.interfaces.IValidator;
import Exception = geranium.exceptions.Exception;

@routed
class App extends ViewModel {
    view() { return Train; }

    constructor(routes?: string[]) {
        super();
        var trip = State.get(TrainTrip);
        this.obtain(trip);
    }

    max: number = 0;

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
        let percentage = this._now / this.max * 100;
        $('.determinate').css('width', percentage.toString() + '%');
    }

    documentTitle() { return 'Application'; }

    validators: IValidator[] = [
        new TypeValidator("now","number"),
        new NotLessThenZeroValidator("now"),
        new RangeValidator("now", 0, 10, false),
    ];

    autoupdate() { return false; }
}