import vm = geranium.viewmodels.abstract.ViewModel;
import router = geranium.routing.abstract.Router;
import ValidationResult = geranium.validating.contracts.ValidationResult;
import IValidator = geranium.validating.validator.interfaces.IValidator;
import Exception = geranium.exceptions.Exception;

//@router.routed
class App extends vm {
    view() { return Train; }

    max: number = 10;

    _now: number = 0;
    get now(): number {
        this.progressBar();
        return this._now;
    }
    set now(val: number) {
        debugger;
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
        this.now = this.jumpto;
        this.progressBar();
    }

    progressBar() {
        let percentage = this._now / this.max * 100;
        $('.determinate').css('width', percentage.toString() + '%');
    }

    documentTitle() { return 'Application'; }

    validators: IValidator[] = [
        new NotLessThenZeroValidator("now"),
        //new RangeValidator("now", 0, 10, false)
    ];

    autoupdate() { return false; }
}