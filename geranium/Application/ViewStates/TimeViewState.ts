import viewstate = geranium.viewstate.ViewState;
class TimeViewState extends viewstate {
    state() { return ServerTime; }
    view() { return H1Time; }
}