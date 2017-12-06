export interface IViewBinder {
    bind(context: BindContext): Promise<ViewDOM>;
}