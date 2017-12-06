export function findAndFilter(root: HTMLElement, query: string): HTMLElement[] {
    return Array.prototype.slice.call(root.querySelectorAll(query), 0);
}