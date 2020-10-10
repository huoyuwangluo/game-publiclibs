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
    var MateriaMaiGuInfoView = (function (_super) {
        __extends(MateriaMaiGuInfoView, _super);
        function MateriaMaiGuInfoView() {
            return _super.call(this) || this;
        }
        MateriaMaiGuInfoView.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        MateriaMaiGuInfoView.prototype.enter = function () {
            GameModels.copyMaterial.onProgressChange(this, this.progressHandler);
            this.btnLuckBoss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.luckBossHandler, this);
            var gameMaterialMaiGu = app.gameContext.gameCurrent;
            this.showView();
        };
        MateriaMaiGuInfoView.prototype.exit = function () {
            this.timeOver();
            GameModels.copyMaterial.offProgressChange(this, this.progressHandler);
            this.btnLuckBoss.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.luckBossHandler, this);
        };
        MateriaMaiGuInfoView.prototype.progressHandler = function () {
            this.showView();
        };
        MateriaMaiGuInfoView.prototype.showView = function () {
            var copyNotifyProgressEx = GameModels.copyMaterial.copyNotifyProgressEx;
            if (!copyNotifyProgressEx) {
                this.visible = false;
                return;
            }
            this.visible = true;
            this.labCount.text = copyNotifyProgressEx.CurrBoShu + "/" + copyNotifyProgressEx.MaxBoShu;
            if (copyNotifyProgressEx.CurrBoShu < copyNotifyProgressEx.MaxBoShu) {
                this.labNext.text = Language.J_JLYYBCXHY;
            }
            else {
                this.labNext.text = Language.J_JLFBJSHY;
            }
            this.labMonsters.text = copyNotifyProgressEx.LeftCount + "";
            this._leftTime = copyNotifyProgressEx.LeftTime;
            this.imgWarn.visible = copyNotifyProgressEx.LeftCallCount > 0;
            if (this._leftTime > 0) {
                //开始倒计时
                this.labTime.visible = true;
                this.startTime();
            }
            else {
                this.labTime.visible = false;
            }
            this.hurtHandler();
        };
        MateriaMaiGuInfoView.prototype.hurtHandler = function () {
            var gameMaterialMaiGu = app.gameContext.gameCurrent;
            this._getGameSmartNpc = gameMaterialMaiGu.getGameSmartNpc();
            if (this._getGameSmartNpc && this._getGameSmartNpc.vo) {
                this.progressStarExp.maximum = this._getGameSmartNpc.vo.hpMax;
                this.progressStarExp.value = this._getGameSmartNpc.vo.hp;
                this.labPercent.text = Math.floor(this.progressStarExp.value / this.progressStarExp.maximum * 100) + "%";
            }
            else {
                this.progressStarExp.maximum = 100;
                this.progressStarExp.value = 100;
                this.labPercent.text = Math.floor(this.progressStarExp.value / this.progressStarExp.maximum * 100) + "%";
            }
            this.progressStarExp.labelDisplay.visible = false;
        };
        MateriaMaiGuInfoView.prototype.luckBossHandler = function (e) {
            if (!mo.ModelGameMaterial.MAIGU_GAMING_BOO)
                return;
            mg.alertManager.showAlert(MaiGuGoodLukyBossAlert, true, true, utils.Handler.create(this, function () {
                this.showView();
            }));
        };
        /**开始倒计时*/
        MateriaMaiGuInfoView.prototype.startTime = function () {
            this.showTime();
            this.updateTime();
        };
        /**倒计时结束 */
        MateriaMaiGuInfoView.prototype.timeOver = function () {
            utils.timer.clearAll(this);
        };
        /**进行倒计时 */
        MateriaMaiGuInfoView.prototype.updateTime = function () {
            utils.timer.countdown(this._leftTime, this, this.showTime, this.timeOver);
        };
        /**显示倒计时*/
        MateriaMaiGuInfoView.prototype.showTime = function () {
            this._leftTime--;
            this.labTime.text = this._leftTime + Language.Z_MIAO;
        };
        return MateriaMaiGuInfoView;
    }(ui.MateriaMaiGuInfoSkin));
    copy.MateriaMaiGuInfoView = MateriaMaiGuInfoView;
    __reflect(MateriaMaiGuInfoView.prototype, "copy.MateriaMaiGuInfoView");
})(copy || (copy = {}));
