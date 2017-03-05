interface JQuery {
    findAndfilter(query: string): JQuery;
    jhtml(element: JQuery): JQuery;
}
$.fn.findAndfilter = function (query: string) {
    let $this = $(this);
    return $this.filter(query).add($this.find(query));
};
$.fn.jhtml = function (element: JQuery) {
    let $this = $(this);
    $this.html('');
    return $this.append(element);
}