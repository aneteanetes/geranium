namespace geranium.runtime.reflection.cloning {
    export class ClonerAssign<T> implements interfaces.ICloner{
		clone<T>(sample: T): T {
			return appSettings.inheritanceimpartor.inherit(null, sample);
        }
    }
}