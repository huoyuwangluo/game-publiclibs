var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var login;
(function (login) {
    var CreatePlayerName = (function (_super) {
        __extends(CreatePlayerName, _super);
        function CreatePlayerName() {
            var _this = _super.call(this) || this;
            _this._sex = true;
            _this._job = 0;
            _this._name = "";
            return _this;
        }
        CreatePlayerName.prototype.initialize = function () {
            Mediator.getMediator(this).onAdd(this, this.enter);
            Mediator.getMediator(this).onRemove(this, this.exit);
        };
        CreatePlayerName.prototype.enter = function () {
            this._input = false;
            mg.uiManager.removeAllDialogs();
            this._job = 1;
            this._name = GameModels.login.randomName(this._sex);
            this.updateName();
            this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cllickHandler, this);
            this.btnRandom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cllickHandler, this);
            this.input.addEventListener(egret.FocusEvent.FOCUS_IN, this.onCharactorFocusIn, this);
            GameModels.platform.uploadCreateRoleEnter();
        };
        CreatePlayerName.prototype.exit = function () {
            this._data = null;
            this.btnOK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cllickHandler, this);
            this.btnRandom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cllickHandler, this);
            this.input.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onCharactorFocusIn, this);
            RES.destroyRes('create_back_jpg');
            // RES.destroyRes('create_back1_png');
            RES.destroyRes('create_json');
        };
        CreatePlayerName.prototype.onCharactorFocusIn = function () {
            this._input = true;
        };
        CreatePlayerName.prototype.updateName = function () {
            this.input.text = this._name;
        };
        /**解救红颜对话完成回调 */
        CreatePlayerName.prototype.storyHongYanEndCallFun = function () {
            mg.alertManager.showAlert(MainUnLockHongYanAlter, true, true);
        };
        CreatePlayerName.prototype.cllickHandler = function (e) {
            switch (e.currentTarget) {
                case this.btnOK:
                    {
                        GameModels.platform.uploadCreateRoleClick();
                        var name = this.input.text.replace(/ /g, "");
                        if (!name) {
                            mg.alertManager.tip(Language.J_QSRYHM, 0xff0000);
                            return;
                        }
                        if (this._input && GameModels.login.hasSensitives(name)) {
                            mg.alertManager.tip(Language.J_MCHYFFZF, 0xff0000);
                            return;
                        }
                        if (this.input.text.length > 6) {
                            mg.alertManager.tip(Language.J_ZDZN6FZF, 0xff0000);
                            return;
                        }
                        logger.log('创建角色....', name);
                        // this.btnOK.enabled = false;
                        GameModels.bag.requestChangeName(this.input.text, 3, utils.Handler.create(this, function () {
                            mg.uiManager.remove(CreatePlayerName);
                            app.gameContext.exitToMainGame();
                            /**解救红颜对话 */
                            mg.StoryManager.instance.startBigStory(111, this, this.storyHongYanEndCallFun);
                        }));
                    }
                    break;
                case this.btnRandom:
                    {
                        this._input = false;
                        this._name = GameModels.login.randomName(this._sex);
                        this.updateName();
                    }
                    break;
            }
        };
        return CreatePlayerName;
    }(ui.CreatePlayerNameSkin));
    login.CreatePlayerName = CreatePlayerName;
    __reflect(CreatePlayerName.prototype, "login.CreatePlayerName");
})(login || (login = {}));
