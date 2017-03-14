import vm = geranium.viewmodels.abstract.ViewModel;
import router = geranium.routing.abstract.Router;

@router.routed
class App extends vm {
    view() { return Train; }

    max: number = 10;
    now: number = 0;
    jumpto: number = 0;
    
    increment() {
        this.now++;
    }
    decrement() {
        this.now--;
    }
    jump() {
        this.now = this.jumpto;
    }

    documentTitle() { return 'Application'; }

    autoupdate() { return false; }
}