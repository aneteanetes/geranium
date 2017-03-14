import view = geranium.view.abstract.View;
class Train extends view {
    declare() {
        return $('.templates .train').html();
    }
}