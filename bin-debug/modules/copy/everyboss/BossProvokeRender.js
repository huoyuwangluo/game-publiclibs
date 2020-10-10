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
var renderer;
(function (renderer) {
    var BossProvokeRender = (function (_super) {
        __extends(BossProvokeRender, _super);
        function BossProvokeRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._intervalNum = 15;
            _this._leftTime = 0;
            return _this;
        }
        BossProvokeRender.prototype.initialize = function () {
            this.visible = false;
        };
        BossProvokeRender.prototype.show = function (battleScene) {
            this._battleScene = battleScene;
            this.visible = true;
            this.btnBiaoQing.visible = true;
            this.btnBiaoQing.source = this.gpContent.visible ? "img_provoke_openBtn1_png" : "img_provoke_openBtn2_png";
            this.btnBiaoQing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openContents, this);
            this.gpImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendProvoke, this);
        };
        BossProvokeRender.prototype.hide = function () {
            this.clearSendIntervalTime();
            this.visible = false;
            this.btnBiaoQing.visible = false;
            this.gpContent.visible = false;
            this.btnBiaoQing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openContents, this);
            this.gpImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendProvoke, this);
        };
        BossProvokeRender.prototype.reset = function () {
            this.hide();
            this._battleScene = null;
        };
        BossProvokeRender.prototype.openContents = function () {
            this.gpContent.visible = !this.gpContent.visible;
            this.btnBiaoQing.source = this.gpContent.visible ? "img_provoke_openBtn1_png" : "img_provoke_openBtn2_png";
        };
        BossProvokeRender.prototype.clearSendIntervalTime = function () {
            utils.timer.clear(this);
            this._leftTime = 0;
        };
        BossProvokeRender.prototype.sendProvoke = function (e) {
            var _this = this;
            if (this._leftTime > 0) {
                mg.alertManager.tip(Language.getExpression(Language.E_1SHKTX, this._leftTime), 0xff2919);
                return;
            }
            var index = this.gpImg.getChildIndex(e.target);
            if (index == -1)
                return;
            if (this._battleScene instanceof mo.ModelSceneEveryBoss) {
                // if(e.target instanceof eui.Image){
                //     e.target.source
                // }
                this._battleScene.requestSendProvoke(1, index, "", this, function () {
                    utils.timer.clear(_this);
                    _this._leftTime = _this._intervalNum;
                    utils.timer.countdown(_this._intervalNum, _this, function () { _this._leftTime--; }, null);
                });
            }
            else {
                copy.CopyMainView.instance.provokeInfo.show(null, index);
            }
            this.gpContent.visible = false;
            this.btnBiaoQing.source = this.gpContent.visible ? "img_provoke_openBtn1_png" : "img_provoke_openBtn2_png";
        };
        return BossProvokeRender;
    }(ui.BossProvokeRenderSkin));
    renderer.BossProvokeRender = BossProvokeRender;
    __reflect(BossProvokeRender.prototype, "renderer.BossProvokeRender");
})(renderer || (renderer = {}));
