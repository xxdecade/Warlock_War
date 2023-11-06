class GameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="game_menu">
    <div class="game_menu_field">
        <div class="game_menu_field_item game_menu_field_item_single_mod">
            单人模式
        </div>
        <br><br>
        <div class="game_menu_field_item game_menu_field_item_multi_mod">
            多人模式
        </div>
        <br><br>
        <div class="game_menu_field_item game_menu_field_item_settings">
            设置
        </div>
    </div>
</div>
`);
        this.root.$game.append(this.$menu);
        this.$single_mod = this.$menu.find('.game_menu_field_item_single_mod');
        this.$multi_mod = this.$menu.find('.game_menu_field_item_multi_mod');
        this.$settings = this.$menu.find('.game_menu_field_item_settings');

        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        this.$single_mod.click(function() {
            outer.hide();
            outer.root.playground.show();
        });
        this.$multi_mod.click(function() {
            console.log("click multi mode");
        });
        this.$settings.click(function() {
            console.log("click settings");
        });
    }

    show() {
        this.$menu.show();
    }

    hide() {
        this.$menu.hide();
    }
}
let GAME_OBJECTS = [];

class GameObject {
    constructor() {
        GAME_OBJECTS.push(this);

        this.has_called_start = false;
        this.timedelta = 0;
    }

    start() {
        
    }

    update() {
        
    }

    on_destroy() {
        
    }

    destroy() {
        this.on_destory();

        for (let i = 0; i < GAME_OBJECTS.length; i ++) {
            if (GAME_OBJECTS[i] === this) {
                GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;
let GAME_ANIMATION = function(timestamp) {

    for (let i = 0; i < GAME_OBJECTS.length; i ++) {
        let obj = GAME_OBJECTS[i];
        if (!obj.has_called_start) {
            obj.start();
            obj.has_called_start = true;
        }else{
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;

    requestAnimationFrame(GAME_ANIMATION);
}

requestAnimationFrame(GAME_ANIMATION);
class GameMap extends GameObject {
    constructor(playground) {
        super();
        this.playground = playground;
        this.$canvas = $(`<canvas></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.playground.$playground.append(this.$canvas);
    }

    start() {

    }

    update() {
        this.render();
    }

    render() {
        this.ctx.fillStyle = "rgba(0, 0, 0)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
class GamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="game_playground"></div>`);

       // this.hide();
        this.root.$game.append(this.$playground);
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        this.start();
    }

    start(){
    }

    show() {
        this.$playground.show();
    }

    hide() {
        this.$playground.hide();
    }
}
export class Game {
    constructor(id) {
        this.id = id;
        this.$game = $('#' + id);
       // this.menu = new GameMenu(this);
        this.playground = new GamePlayground(this);

        this.start();
    }

    start(){
    }
}
