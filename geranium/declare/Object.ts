interface Object {
    getType(): { new (...args: any[]): Object };
}
Object.prototype.getType = function () {
    return (<any>this).constructor;
};