class App {
    constructor(h, w) {
        this.height = h;
        this.width = w;
    }

    show() {
        console.log(this.radius + " - " + this.height + " - " + this.width)
    }
}


let app = new App(5, 5);
app.show();