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