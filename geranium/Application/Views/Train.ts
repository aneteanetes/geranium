import View = geranium.view.abstract.View;
class Train extends View {
    declare() {
        return $('.templates .train').html();
    }
}