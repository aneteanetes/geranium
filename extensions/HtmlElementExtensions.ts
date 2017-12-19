export function findAndFilter(set: HTMLElement[], query: string): HTMLElement[] {
    return set.map(root => {
        const parent = root.parentElement || root;
        return toHtmlArray(parent.querySelectorAll(query));
    }).reduce((p, n) => p.concat(n));
}
export function toHtmlArray(nodes: NodeList): HTMLElement[] {
    return Array.prototype.slice.call(nodes, 0)
}