namespace geranium.runtime {
    export class StatesStorage extends WindowStorage implements storage.interfaces.IGenericStorage<states.State>  {
        all(): states.State[] {
            return window[this.variable];
        }
    }
}