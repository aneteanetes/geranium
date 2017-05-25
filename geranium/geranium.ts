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
import Routeroot = geranium.routing.routeroot;
import Routeignore = geranium.routing.routeignore;
import IValidatingReporter = geranium.validating.reporter.interfaces.IValidatingReporter;
import ValidationResult = geranium.validating.contracts.ValidationResult;
import Exception = geranium.exceptions.Exception;
import ICloner = geranium.runtime.reflection.cloning.interfaces.ICloner;
import ICloneable = geranium.runtime.reflection.cloning.decorators.ICloneable;
import Inherit = geranium.runtime.reflection.inheritance.decorators.Inherit;