class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "web";
        if (this.root.acos) this.platform = "ac";
        this.username = "";
        this.photo = "";

        this.$settings = $(`
<div class="game_settings">
    <div class="game_settings_login">
        <div class="game_settings_title">
            登录
        </div>
        <div class="game_settings_username">
            <div class="game_settings_item">
                <input type="text" placeholder="用户名">
            </div>
        </div>
        <div class="game_settings_password">
            <div class="game_settings_item">
                <input type="password" placeholder="密码">
            </div>
        </div>
        <div class="game_settings_submit">
            <div class="game_settings_item">
                <button>登录</button>
            </div>
        </div>
        <div class="game_settings_error_messages">
        </div>
        <div class="game_settings_options">
            注册
        </div>
        <br><br>
        <div class="game_settings_wechat">
            <img width="35" src="https://jiyuhang.com/static/image/settings/wechatlogo.png">
        </div>
        <div class="game_settings_qq">
            <img width="35" src="https://jiyuhang.com/static/image/settings/qqlogo.png">
        </div>
    </div>
    <div class="game_settings_register">
        <div class="game_settings_title">
            注册
        </div>
        <div class="game_settings_username">
            <div class="game_settings_item">
                <input type="text" placeholder="用户名">
            </div>
        </div>
        <div class="game_settings_password game_settings_password_first">
            <div class="game_settings_item">
                <input type="password" placeholder="密码">
            </div>
        </div>
        <div class="game_settings_password game_settings_password_second">
            <div class="game_settings_item">
                <input type="password" placeholder="确认密码">
            </div>
        </div>
        <div class="game_settings_submit">
            <div class="game_settings_item">
                <button>注册</button>
            </div>
        </div>
        <div class="game_settings_error_messages">
        </div>
        <div class="game_settings_options">
            登录
        </div>
    </div>
    <div class="web_info_show">
        <div class="beian_show">
            &nbsp
            <a href="https://beian.miit.gov.cn/#/Integrated/index">ICP备案号：苏ICP备2023001614号-1</a>
        </div>
        <div class="other_info_show">
            <a href="mailto:xxdecade@163.com"">联系作者</a>
            &nbsp &nbsp
            <a href="https://github.com/xxdecade/Warlock_War">项目地址</a>
            &nbsp
        </div>
</div>
`);
        this.$login = this.$settings.find(".game_settings_login");
        this.$login_username = this.$login.find(".game_settings_username input");
        this.$login_password = this.$login.find(".game_settings_password input");
        this.$login_submit = this.$login.find(".game_settings_submit button");
        this.$login_error_message = this.$login.find(".game_settings_error_messages");
        this.$login_register = this.$login.find(".game_settings_options");

        this.$login.hide();

        this.$register = this.$settings.find(".game_settings_register");
        this.$register_username = this.$register.find(".game_settings_username input");
        this.$register_password = this.$register.find(".game_settings_password_first input");
        this.$register_password_confirm = this.$register.find(".game_settings_password_second input");
        this.$register_submit = this.$register.find(".game_settings_submit button");
        this.$register_error_message = this.$register.find(".game_settings_error_messages");
        this.$register_login = this.$register.find(".game_settings_options");

        this.$register.hide();

        this.root.$game.append(this.$settings);

        this.start();
    }

    start() {
        this.getinfo();
        this.add_listening_events();
    }

    add_listening_events() {
        this.add_listening_events_login();
        this.add_listening_events_register();
    }

    add_listening_events_login() {
        let outer = this;
        this.$login_register.click(function() {
            outer.register();
        });
        this.$login_submit.click(function() {
            outer.login_on_remote();
        });
    }

    add_listening_events_register() {
        let outer = this;
        this.$register_login.click(function() {
            outer.login();
        });
        this.$register_submit.click(function() {
           outer.register_on_remote();
        });
    }

    login_on_remote() {
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();

        $.ajax({
            url: "https://jiyuhang.com/settings/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();
                } else {
                    outer.$login_error_message.html(resp.result);
                }
            }
        });
    }

    register_on_remote() {
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();
        this.$register_error_message.empty();

        $.ajax({
            url: "https://jiyuhang.com/settings/register/",
            type: "GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();
                } else {
                    outer.$register_error_message.html(resp.result);
                }
            }
        });
    }

    logout_on_remote() {
        if (this.platform === "ac")
            return false;
        $.ajax({
            url: "https://jiyuhang.com/settings/logout/",
            type: "GET",
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();
                }
            }
        });
    }

    register() {
        this.$login.hide();
        this.$register.show();
    }

    login() {
        this.$register.hide();
        this.$login.show();
    }

    getinfo() {
        let outer = this;

        $.ajax({
            url: "https://jiyuhang.com/settings/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function(resp) {
                if (resp.result == "success") {
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    outer.hide();
                    outer.root.menu.show();
                } else {
                    outer.login();
                }
            }
        });
    }

    hide() {
        this.$settings.hide();
    }

    show() {
        this.$setting.show();
    }
}
