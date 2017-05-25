namespace geranium.runtime.reflection.inheritance.decorators {
	export function Inherit(baseClassConstructor: (new (...args: any[]) => {})) {
		return (constructor: any) => {
			appSettings.inheritanceimpartor.inherit(constructor, baseClassConstructor);
		}
	}
}