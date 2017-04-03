namespace geranium.routing.contracts {
	export class Route {
        url: string;
        /**
         * constructor of this object
         */
        ctor: { new (...args: any[]): any };
        /**
         * Executable function of this routes, if empty: toString()
         */
        executable: string;
        /**
         * selector for executable function
         */
        selector: string;
        restore: boolean;
	}
}