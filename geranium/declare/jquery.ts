interface JQuery {
    findAndfilter(query: string): JQuery;
    jhtml(element: JQuery): JQuery;
    outerHtml(): string;
    collapsible();
}
if (!$.fn.findAndfilter) {
    $.fn.findAndfilter = function (query: string) {
        let $this = $(this);
        return $this.filter(query).add($this.find(query));
    }
}
if (!$.fn.jhtml) {
    $.fn.jhtml = function (element: JQuery) {
        let $this = $(this);
        $this.html('');
        return $this.append(element);
    }
}
if (!$.fn.outerHtml) {
    $.fn.outerHtml = function () {
        return $('<div>').append($(this).clone()).html();
    }
}