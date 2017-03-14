import vm = geranium.viewmodels.abstract.ViewModel;
import router = geranium.routing.abstract.Router;
import ValidationResult = geranium.validating.contracts.ValidationResult;
import IValidator = geranium.validating.validator.interfaces.IValidator;
import Exception = geranium.exceptions.Exception;

@router.routed
class App extends vm {
	view() { return Train; }

	max: number = 10;
	now: number = 0;
	jumpto: number = 0;

	increment() {
		this.now++;
		this.progressBar();
	}
	decrement() {
		this.now--;
		this.progressBar();
	}
	jump() {
		this.now = this.jumpto;
		this.progressBar();
	}

	progressBar() {
		let percentage = this.now / this.max * 100;
		$('.determinate').css('width', percentage.toString() + '%');
	}

	documentTitle() { return 'Application'; }

	validators: IValidator[] = [
		new NotZeroValidator("now"),
		new RangeValidator("now", 0, 10, false)
	];

	autoupdate() { return false; }
}