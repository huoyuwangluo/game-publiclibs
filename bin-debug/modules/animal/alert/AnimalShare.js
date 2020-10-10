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
var animal;
(function (animal) {
    var AnimalShare = (function (_super) {
        __extends(AnimalShare, _super);
        function AnimalShare() {
            return _super.call(this) || this;
        }
        AnimalShare.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._rwards = [this.reward0, this.reward1, this.reward2, this.reward3];
            Mediator.getMediator(this).onAdd(this, this.enter);
            Mediator.getMediator(this).onRemove(this, this.exit);
        };
        AnimalShare.prototype.enter = function () {
            var _this = this;
            GameModels.share.requestGetFirstShareStatus(utils.Handler.create(this, function () {
                _this.showView();
            }));
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetReward, this);
            GameModels.share.addEventListener(mo.ModelShare.FIRSTREWARD_UPDATA, this.showView, this);
        };
        AnimalShare.prototype.showView = function () {
            for (var i = 0; i < this._rwards.length; i++) {
                this._rwards[i].dataSource = null;
            }
            this.imgBuyFinsh.visible = false;
            this.btnEnter.visible = true;
            var rewards = GameModels.dataSet.getDataSettingValueById(910001).split(";");
            for (var i = 0; i < 4; i++) {
                var iconBox = this._rwards[i];
                iconBox.labName.stroke = 1;
                if (i < rewards.length) {
                    iconBox.dataSource = rewards[i];
                    iconBox.labName.stroke = 2;
                    this.boxGroup.addChild(iconBox);
                }
                else {
                    if (iconBox.parent) {
                        iconBox.parent.removeChild(iconBox);
                    }
                }
            }
            var status = GameModels.share.firstShareStatus;
            if (status == 0) {
                this.btnEnter.label = Language.C_FX;
                this.btnEnter.skinName = "skins.SnapBigButton2Skin";
            }
            else if (status == 1) {
                this.btnEnter.label = Language.C_LQ;
                this.btnEnter.skinName = "skins.SnapBigButton3Skin";
            }
            else {
                this.imgBuyFinsh.visible = true;
                this.btnEnter.visible = false;
            }
        };
        AnimalShare.prototype.onGetReward = function (e) {
            var firstStatus = GameModels.share.firstShareStatus;
            if (firstStatus == 0) {
                GameModels.platform.shareAppMessage(1);
                GameModels.share.requestSetFirstShareStatus();
            }
            else if (firstStatus == 1) {
                GameModels.share.requestGetFirstShareReward();
            }
        };
        AnimalShare.prototype.exit = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetReward, this);
            GameModels.share.removeEventListener(mo.ModelShare.FIRSTREWARD_UPDATA, this.showView, this);
        };
        AnimalShare.prototype.btnCloseClick = function (e) {
            mg.uiManager.remove(this);
        };
        return AnimalShare;
    }(ui.AnimalShareSkin));
    animal.AnimalShare = AnimalShare;
    __reflect(AnimalShare.prototype, "animal.AnimalShare");
})(animal || (animal = {}));
