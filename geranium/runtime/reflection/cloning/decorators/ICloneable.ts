namespace geranium.runtime.reflection.cloning.decorators {
    export function ICloneable(constructor: any) {        
        constructor.prototype.clone = function () {            
            return appSettings.cloner.clone(this);
        };
    }
}