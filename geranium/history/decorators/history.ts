module geranium.history {
    var constructors: any[] = [];
    export function history(constructor: any) {
        constructors.push(constructor);
    }    
    export function is(constructor: any): boolean {
        return constructors.indexOf(constructor) > -1;
    }
}