namespace geranium {
    export enum color {
        purple = 0,
        darkgreen = 1,
        pink = 2
    }
    var inBlossom = false;
    export function blossom(colorull?: color) {
        let col = colorull || color.purple;
        console.log('%cgeranium is blossom', 'font-weight:bold;color: ' + color[col]);
    }
    $(function () {
        if (!inBlossom)
            geranium.blossom();
    });
}

//как и сам паттерн MVVM - герань это инструмент который заставляет тебя писать MVVM
//а вот angular и react это инструменты которые реализуют MVVM, а тебе уже предлагают интерфейс для взаимодействия

import appSettings = geranium.runtime.appSettings;
import Model = geranium.models.abstract.Model;
import State = geranium.states.State;
import View = geranium.view.abstract.View;
import ViewState = geranium.viewstate.ViewState;
import ViewModel = geranium.viewmodels.abstract.ViewModel;
import IValidator = geranium.validating.validator.interfaces.IValidator;
import Report = geranium.validating.reporter.interfaces.IValidatingReporter;
import Binding = geranium.binding.abstract.Binding;
import Routed = geranium.routing.routed;
import Routeroot = geranium.routing.routeroot;
import Routeignore = geranium.routing.routeignore;

@Routeroot
class application extends ViewModel {
    view() { return '<h1 data-field="Name">{{Name}}</h1>'; }

    name: string = "karl";
    get Name(): string { return 'Hello, ' + this.name[0].toUpperCase() + this.name.substring(1) + '!'; }
    set Name(val) { this.name = val; }
}


//import routed = geranium.routing.routed;

////application initialization
//import appSettings = geranium.runtime.AppSettings;
//appSettings.init({
//    validreport: new MaterializeValidationRepoter()
//});
//appSettings.bidnings.push(CollectionBinding);


////my states/viewstates
//new TimeViewState('.servertime');
//new TrainTrip();

////my viewmodels
//var controls = new Controls();
//controls.display('.controlpanel');

////some application logic
//State.get(ServerTime).bind = (x: ServerTime) => {
//    if (x.time.substring(7) == "0") {
//        var app = appSettings.router.Current<App>();

//        if (app != undefined) {
//            if (app != null && app.now != app.max) {
//                app.now++;
//                if (app.now == app.max)
//                    Materialize.toast('Train finished!', 10000, 'green');
//            }
//        }
//    }
//}

//setInterval(() => {
//    geranium.runtime.appSettings.request.raise();
//}, 1100);

//$(function () {
//    $('.collapsible').collapsible();
//})