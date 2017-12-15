export function findAndFilter(root: HTMLElement, query: string): HTMLElement[] {
    const parent = root.parentElement || root;
    return Array.prototype.slice.call(parent.querySelectorAll(query), 0);
}