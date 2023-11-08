export class Game {
    constructor(id, acos) {
        this.id = id;
        this.$game = $('#' + id);
        this.acos = acos;

        this.settings = new Settings(this);
        this.menu = new GameMenu(this);
        this.playground = new GamePlayground(this);

        this.start();
    }

    start(){
    }
}
