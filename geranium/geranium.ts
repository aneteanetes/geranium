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

//abstract class lk extends ViewModel {
//}
//abstract class personal extends lk {
//}

//@Routed
//class Contests extends personal {
//    constructor() {
//        super();
//        this.archive = [];
//    }
//    view() { return StartView; }

//    current: Array<any> = [
//        { Title: 'hi', conducting: '01.01.17-02.01.17', id: 1 },
//        { Title: 'Мокрые майки', conducting: '01.01.17-02.01.17', id: 2 }
//    ];
//    archive: Array<any>;

//    test(id: number) {
//        debugger;
//        id += 1;
//        console.log(id);
//    }

//    autoupdate() { return false; }
//}

//class StartView extends View {
//    declare() {
//        return $('.startview').html();
//    }
//}

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