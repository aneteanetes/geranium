module geranium.runtime {
    export class StatesStorage extends WindowStorage {
        all(): states.State[] {
            return window[this.variable];
        }
    }
}