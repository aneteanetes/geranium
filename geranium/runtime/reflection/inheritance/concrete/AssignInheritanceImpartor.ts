namespace geranium.runtime.reflection.inheritance {
	export class AssignInheritanceImpartor implements interfaces.IInheritanceImpartor {
		inherit(derived: any, base: any) {

			if (!derived)
				derived = {};

			var _props = this.props(base).filter(x => this.notCoreFunc(x));
			_props.forEach(key => {
				if (typeof base[key] === 'function') {
					derived[key] = (...args: any[]) => {
						(base[key] as any).apply(derived, args);
					};
				} else
					derived[key] = base[key];
			});
		}

		notCoreFunc(key: string) {
			return ["constructor",
				"clone",
				"__defineGetter__",
				"__defineSetter__",
				"hasOwnProperty",
				"__lookupGetter__",
				"__lookupSetter__",
				"propertyIsEnumerable",
				"__proto__",
				"toString",
				"toLocaleString",
				"valueOf",
				"isPrototypeOf"].indexOf(key) == -1;
		}

		props(obj: any): string[] {
			var p = [];
			for (; obj != null; obj = Object.getPrototypeOf(obj)) {
				var op = Object.getOwnPropertyNames(obj);
				for (var i = 0; i < op.length; i++)
					if (p.indexOf(op[i]) == -1)
						p.push(op[i]);
			}
			return p;
		}
	}
}