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
var treasure;
(function (treasure) {
    var TreasureMain = (function (_super) {
        __extends(TreasureMain, _super);
        function TreasureMain() {
            var _this = _super.call(this) || this;
            _this._togs = [_this.togSmokPet, _this.togQiYuan, _this.togGuanXing];
            return _this;
        }
        TreasureMain.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            GameModels.state.registerWarnTarget(GameRedState.TREASURE_GUANXING, this.togGuanXing);
            GameModels.state.registerWarnTarget(GameRedState.TREASURE_SMOKEPET, this.togSmokPet);
            GameModels.state.registerWarnTarget(GameRedState.TREASURE_JIANGXING, this.togQiYuan);
            Mediator.getMediator(this).onAdd(this, this.enter);
            Mediator.getMediator(this).onRemove(this, this.exit);
        };
        TreasureMain.prototype.enter = function (data) {
            mg.soundManager.playViewLongSound("SoundJM_9", "TREASURE");
            this.selectedTab(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
            this.togGuanXing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTogHandler, this);
            this.togSmokPet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTogHandler, this);
            this.togQiYuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTogHandler, this);
        };
        TreasureMain.prototype.exit = function () {
            this.qiyuan.reset();
            this.guanxing.reset();
            this.smokePet.exit();
            this.togGuanXing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTogHandler, this);
            this.togSmokPet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTogHandler, this);
            this.togQiYuan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTogHandler, this);
        };
        TreasureMain.prototype.clickTogHandler = function (e) {
            if (this._togs.indexOf(e.currentTarget) == 2) {
                if (GameModels.user.player.level < 100 && GameModels.user.player.vip < 2) {
                    mg.alertManager.tip(Language.C_VIP2KF, 0xff0000);
                    this.togGuanXing.currentState = "up";
                    return;
                }
            }
            else {
                if (!TypeFunOpen.checkFuncOpen(this, this._togs.indexOf(e.currentTarget), true)) {
                    this._togs[this._togs.indexOf(e.currentTarget)].currentState = "up";
                    return;
                }
            }
            mg.soundManager.playSound('ButtonClick_1');
            this.selectedTab(this._togs.indexOf(e.currentTarget));
        };
        TreasureMain.prototype.selectedTab = function (index) {
            this.updateButtons(index);
            switch (this._togs[index]) {
                case this.togQiYuan:
                    this.currentState = "qiyuan";
                    break;
                case this.togSmokPet:
                    this.currentState = "smokepet";
                    break;
                case this.togGuanXing:
                    this.currentState = "guanxing";
                    break;
            }
            this.invalidateProperties();
            this.dispatchEventWith(TreasureMain.CHANG_TAL);
        };
        TreasureMain.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.currentState == "qiyuan") {
                this.initQiYuanView();
                this.smokePet.exit();
                this.guanxing.reset();
            }
            else if (this.currentState == "smokepet") {
                this.initSmokepetView();
                this.qiyuan.reset();
                this.guanxing.reset();
            }
            else if (this.currentState == "guanxing") {
                this.initGuanxingView();
                this.qiyuan.reset();
                this.smokePet.exit();
            }
        };
        TreasureMain.prototype.updataChange = function () {
            this.dispatchEventWith(TreasureMain.CHANG_TAL);
        };
        TreasureMain.prototype.initSmokepetView = function () {
            this.smokePet.enter();
        };
        TreasureMain.prototype.initQiYuanView = function () {
            this.qiyuan.initView();
        };
        TreasureMain.prototype.initGuanxingView = function () {
            this.guanxing.initView();
        };
        TreasureMain.prototype.updateButtons = function (index) {
            for (var i = 0; i < this._togs.length; i++) {
                this._togs[i].selected = i == index;
                this._togs[i].touchEnabled = i != index;
            }
        };
        Object.defineProperty(TreasureMain.prototype, "guanxingView", {
            get: function () {
                return this.guanxing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreasureMain.prototype, "qiYuanView", {
            get: function () {
                return this.qiyuan;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreasureMain.prototype, "smokePetView", {
            get: function () {
                return this.smokePet;
            },
            enumerable: true,
            configurable: true
        });
        /**标签改变 */
        TreasureMain.CHANG_TAL = "CHANG_TAL";
        return TreasureMain;
    }(ui.TreasureMainSkin));
    treasure.TreasureMain = TreasureMain;
    __reflect(TreasureMain.prototype, "treasure.TreasureMain");
})(treasure || (treasure = {}));
