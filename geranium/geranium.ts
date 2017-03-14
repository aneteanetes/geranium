module geranium {
    export async function blossom() {
    }
}

new TimeViewState('.servertime');



setInterval(() => {
    geranium.runtime.AppSettings.Current.request.raise();
}, 1100);