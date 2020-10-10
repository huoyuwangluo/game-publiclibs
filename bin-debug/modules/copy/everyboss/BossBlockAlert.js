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
var copy;
(function (copy) {
    /**全民Boss执点 */
    var BossBlockAlert = (function (_super) {
        __extends(BossBlockAlert, _super);
        function BossBlockAlert() {
            return _super.call(this) || this;
        }
        BossBlockAlert.prototype.initialize = function () {
            this.createShaiZiAnim();
        };
        BossBlockAlert.prototype.show = function (data) {
            if (data === void 0) { data = null; }
            this.visible = true;
            copy.CopyMainView.instance.relifeView.updataThisPos();
            this.maxPointInfo.visible = false;
            this._battleScene = app.gameContext.gameCurrent.sceneEveryBoss;
            this.btnShaiZi.visible = true;
            this.currentPoint.visible = false;
            this.currentPoint.text = "0";
            this.dropItem.dataSource = this._battleScene.copyVO.template.saiziReward.substring(0, this._battleScene.copyVO.template.saiziReward.indexOf('_'));
            this.displayShaiZiTween();
            this.startTimerCountDown(data ? data.lastTime - 1 : 14);
            if (data) {
                if (data.maxName)
                    this.updateMaxInfo(data.maxName, data.maxNum);
                if (data.mineNum)
                    this.updateMineInfo(data.mineNum);
            }
            this.btnShaiZi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startShakeShaiZi, this);
            this._battleScene.onSeiveMaxNumber(this, this.seiveMaxNumberHandler);
            if (GameModels.user.player.getProperty(TypeProperty.VIP_LEVEL) < 2)
                this.labVipTip.text = Language.J_VIP2KKQZDYSZ;
            else
                this.labVipTip.text = Language.J_YKQZDYSZ;
        };
        BossBlockAlert.prototype.hide = function () {
            if (this.visible == true) {
                this.visible = false;
                copy.CopyMainView.instance.relifeView.updataThisPos();
                utils.timer.clearAll(this);
                egret.Tween.removeTweens(this.timePro);
                this.btnShaiZi.visible = false;
                this.stopShakeShaizi();
                this.btnShaiZi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startShakeShaiZi, this);
                this._battleScene.offSeiveMaxNumber(this, this.seiveMaxNumberHandler);
                this._battleScene = null;
            }
        };
        BossBlockAlert.prototype.seiveMaxNumberHandler = function (data) {
            this.updateMaxInfo(data.PlayerName, data.RandNumber);
        };
        BossBlockAlert.prototype.updateMaxInfo = function (pName, num) {
            this.maxPointInfo.visible = true;
            this.maxPointInfo.text = Language.getExpression(Language.E_1ZCL2D, pName, num);
        };
        BossBlockAlert.prototype.createShaiZiAnim = function () {
            this._imgShaiZi = new eui.Image();
            this._imgShaiZi.anchorOffsetX = this.btnShaiZi.anchorOffsetX;
            this._imgShaiZi.anchorOffsetY = this.btnShaiZi.anchorOffsetY;
            this._imgShaiZi.x = this.btnShaiZi.x;
            this._imgShaiZi.y = this.btnShaiZi.y;
            this._imgShaiZi.touchEnabled = false;
        };
        BossBlockAlert.prototype.displayShaiZiTween = function () {
            if (this.btnShaiZi.visible) {
                if (this._imgShaiZi.source != this.btnShaiZi.getChildAt(0).source) {
                    this._imgShaiZi.source = this.btnShaiZi.getChildAt(0).source;
                }
                this.tweenShaiZi();
                if (!this._imgShaiZi.parent) {
                    this.PointGroup.addChild(this._imgShaiZi);
                }
            }
        };
        BossBlockAlert.prototype.tweenShaiZi = function () {
            this._imgShaiZi.scaleX = this._imgShaiZi.scaleY = 1;
            this._imgShaiZi.alpha = 1;
            egret.Tween.get(this._imgShaiZi).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 1000, utils.Ease.circOut).call(this.displayShaiZiTween, this);
        };
        BossBlockAlert.prototype.startTimerCountDown = function (sec) {
            var _this = this;
            var num = sec;
            this.timePro.maximum = 140;
            this.timePro.value = num * 10;
            egret.Tween.get(this.timePro).to({ value: 0 }, num * 1000, utils.Ease.linearNone);
            this.timeTip.text = Language.getExpression(Language.E_DJS1M, num);
            utils.timer.clearAll(this);
            utils.timer.loop(1000, this, function () {
                num--;
                _this.timeTip.text = Language.getExpression(Language.E_DJS1M, num);
                if (num == 5) {
                    if (GameModels.user.player.getProperty(TypeProperty.VIP_LEVEL) >= 2)
                        if (_this.btnShaiZi.visible == true && app.gameContext.gameCurrent.sceneEveryBoss == _this._battleScene)
                            _this.startShakeShaiZi();
                }
                if (num < 0) {
                    _this.hide();
                }
            });
        };
        BossBlockAlert.prototype.startShakeShaiZi = function () {
            this.currentPoint.visible = false;
            this.btnShaiZi.visible = false;
            this.playShaiZiEffect();
            utils.timer.once(500, this, this.startShakeShaiZiHandler);
        };
        BossBlockAlert.prototype.startShakeShaiZiHandler = function () {
            this._battleScene.requestSievesRandom(this, function (num) {
                this.updateMineInfo(num);
            });
            this.stopShaziEffect();
        };
        BossBlockAlert.prototype.updateMineInfo = function (num) {
            this.currentPoint.visible = true;
            this.currentPoint.text = num + "";
        };
        BossBlockAlert.prototype.stopShakeShaizi = function () {
            utils.timer.clear(this, this.startShakeShaiZiHandler);
            this.stopShaziEffect();
        };
        /**播放投色子动画*/
        BossBlockAlert.prototype.playShaiZiEffect = function () {
            if (!this._shaiZiEffect) {
                this._shaiZiEffect = this.fromEffect('6303');
                this.PointGroup.addChild(this._shaiZiEffect);
                this._shaiZiEffect.x = this.btnShaiZi.x;
                this._shaiZiEffect.y = this.btnShaiZi.y;
                this._shaiZiEffect.frameRate = 12;
            }
            this._shaiZiEffect.play();
        };
        BossBlockAlert.prototype.stopShaziEffect = function () {
            if (this._shaiZiEffect) {
                this._shaiZiEffect.stop();
                if (this._shaiZiEffect.parent) {
                    this._shaiZiEffect.parent.removeChild(this._shaiZiEffect);
                }
                this.toEffect(this._shaiZiEffect);
                this._shaiZiEffect = null;
            }
        };
        return BossBlockAlert;
    }(ui.BossBlockAlertSkin));
    copy.BossBlockAlert = BossBlockAlert;
    __reflect(BossBlockAlert.prototype, "copy.BossBlockAlert", ["IAlert", "egret.DisplayObject"]);
})(copy || (copy = {}));
