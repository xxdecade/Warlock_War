class NoticeBoard extends GameObject {
    constructor(playground) {
        super();

        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.text = "已就绪：0人";
        this.info = "Q:选中火球\nF:选中闪现\n点击鼠标左键释放\n刷新界面可退出";
    }

    start() {
    }

    write(text) {
        this.text = text;
    }

    update() {
        this.render();
    }

    render() {
        this.ctx.font = "20px serif";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";

        this.ctx.fillText(this.text, this.playground.width / 2, 20);

        const infoLines = this.info.split('\n');
        const lineHeight = 14;

        this.ctx.font = "12px serif";
        this.ctx.fillStyle = "yellow";
        infoLines.forEach((line, index) => {
            this.ctx.fillText(line, this.playground.width / 16, lineHeight * (index + 1));
        });
    }


}

