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
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        return _super.call(this) || this;
    }
    Loading.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.markDestoryImage(this.imgBg);
        this._progressWidth = this.progress.width;
        this._progressMainWidth = this.progressMain.width;
        this.imglogo.visible = false;
        // var serverData: mo.ServerItem = GameModels.login.serverList.selected;
        // if (serverData.loginDays) {
        //     if (serverData.loginDays > 2)
        //         this.imgBg.source = "img_loding_bg2_jpg";
        //     if (serverData.loginDays > 7) {
        //         this.imgBg.visible = false;
        //         if (platform.sdk && platform.sdk.logourl) {
        //             this.imglogo.visible = true;
        //             this.imglogo.source = decodeURIComponent(platform.sdk.logourl);
        //         }
        //     }
        // }
    };
    Object.defineProperty(Loading, "instance", {
        get: function () {
            if (!Loading._instance) {
                Loading._instance = new Loading();
            }
            return Loading._instance;
        },
        enumerable: true,
        configurable: true
    });
    Loading.prototype.destory = function () {
        RES.destroyRes('img_loding_png', true);
        RES.destroyRes('loading_json', true);
    };
    Loading.prototype.add = function (tip, autoProgress) {
        if (tip === void 0) { tip = null; }
        if (autoProgress === void 0) { autoProgress = false; }
        if (this.parent)
            return;
        this._tipContent = tip;
        this._progress = 0;
        egret.Tween.removeTweens(this.black);
        mg.layerManager.loading.addChild(this);
        if (this._days > 7) {
            this.imglogo.visible = true;
            this.imglogo.source = game.GameConfig.logourl;
        }
        this.black.visible = true;
        this.black.alpha = 1;
        this.progressMain.visible = this.labValueMain.visible = this.barMain.visible = false;
        this.labTipRefesh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refeshHandler, this);
        mg.stageManager.onResize(this, this.resizeHandler, true);
        this.update();
        this._tipContents = [Language.J_LOADING_TEXT1, Language.J_LOADING_TEXT2, Language.J_LOADING_TEXT3, Language.J_LOADING_TEXT4, Language.J_LOADING_TEXT5];
        if (this._tipContent) {
            this.labTip.text = this._tipContent;
        }
        else {
            this.playTips();
        }
        if (autoProgress) {
            this.updateProgress(1);
            this._progressMain = 0;
            mg.stageManager.addTick(this, this.autoProgressHandler, 60);
        }
    };
    Loading.prototype.remove = function () {
        if (!this.parent)
            return;
        this._tipContent = null;
        utils.timer.once(500, this, this.removeHandler);
    };
    Loading.prototype.removeHandler = function () {
        mg.stageManager.removeTick(this, this.autoProgressHandler);
        this.stopTips();
        this.remveEff();
        this.black.visible = false;
        this.imglogo.visible = false;
        this.labTipRefesh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.refeshHandler, this);
        mg.stageManager.offResize(this, this.resizeHandler);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    Loading.prototype.autoProgressHandler = function () {
        var value = this._progressMain + 0.02;
        if (value >= 1) {
            value = 1;
            mg.stageManager.removeTick(this, this.autoProgressHandler);
        }
        this.updateProgressMain(value);
    };
    Loading.prototype.updateProgressMain = function (value) {
        this._progressMain = value;
        this.addEff();
        this.updateMain();
    };
    Loading.prototype.updateProgress = function (value) {
        this._progress = value;
        if (this._progress > 1) {
            this._progress = 1;
        }
        this.update();
    };
    //更新主进度条
    Loading.prototype.updateMain = function () {
        this.progressMain.visible = this.labValueMain.visible = this.barMain.visible = true;
        this.progressMain.width = (this._progressMain * this._progressMainWidth) >> 0;
        this._effect.x = this.progressMain.x + this.progressMain.width;
        this._effect.y = this.progressMain.y;
        this.labValueMain.text = ((this._progressMain * 100) >> 0) <= 100 ? ((this._progressMain * 100) >> 0) + "%" : "100%";
        this.validateNow();
    };
    //更新次进度条
    Loading.prototype.update = function () {
        this.progress.width = (this._progress * this._progressWidth) >> 0;
        if (!this.progressMain.visible) {
            // this._effect.x = this.progress.x + this.progress.width;
            // this._effect.y = this.progress.y;
        }
        //this.labValue.text=((this._progress*100)>>0)+"%";
    };
    Loading.prototype.playTips = function () {
        this.changeTipHandler();
        utils.timer.loop(2000, this, this.changeTipHandler);
    };
    Loading.prototype.stopTips = function () {
        utils.timer.clear(this, this.changeTipHandler);
    };
    Loading.prototype.changeTipHandler = function () {
        this.labTip.text = this._tipContents[(Math.random() * this._tipContents.length) >> 0];
    };
    Loading.prototype.refeshHandler = function () {
        window.location.reload();
    };
    Loading.prototype.resizeHandler = function (w, h) {
        this.black.width = w;
        this.black.height = h;
        this.width = w;
        this.height = h;
        this.bar.x = w / 2 - this.bar.width / 2;
        this.progress.x = w / 2 - this._progressWidth / 2;
        this.barMain.x = w / 2 - this.barMain.width / 2;
        this.progressMain.x = w / 2 - this._progressMainWidth / 2;
        this.labValueMain.x = this.bar.x + this.bar.width - this.labValueMain.width;
    };
    Loading.prototype.addEff = function () {
        if (!this._effect) {
            this._effect = this.fromEffect("202003");
            this._effect.play();
            this.addChild(this._effect);
        }
    };
    Loading.prototype.remveEff = function () {
        if (this._effect) {
            if (this._effect.parent) {
                this._effect.parent.removeChild(this._effect);
            }
            this._effect.stop();
            utils.ObjectPool.to(this._effect, true);
            this._effect = null;
        }
    };
    return Loading;
}(ui.LoadingSkin));
__reflect(Loading.prototype, "Loading");
