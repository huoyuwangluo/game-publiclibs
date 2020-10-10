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
var GodDieBossReward = (function (_super) {
    __extends(GodDieBossReward, _super);
    function GodDieBossReward() {
        return _super.call(this) || this;
    }
    GodDieBossReward.prototype.show = function () {
        if (!this._listBoxData) {
            this._listBoxData = new eui.ArrayCollection(GameModels.sceneGodDie.rewardArr);
        }
        else {
            this._listBoxData.source = GameModels.sceneGodDie.rewardArr;
        }
        this.list.dataProvider = this._listBoxData;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnUpSureClick, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnUpSureClick, this);
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
    };
    GodDieBossReward.prototype.onBuyClick = function (e) {
        var item = this.list.selectedItem;
        if (e.target instanceof components.SnapButton) {
            GameModels.sceneGodDie.GetReward(item.id, utils.Handler.create(this, this.getRewardCallback, [item.rewards]));
        }
    };
    GodDieBossReward.prototype.getRewardCallback = function (str) {
        if (this._listBoxData)
            this._listBoxData.replaceAll(GameModels.sceneGodDie.rewardArr);
        var rewards = str.split(";");
        mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
    };
    GodDieBossReward.prototype.btnUpSureClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    GodDieBossReward.prototype.hide = function () {
        this.clearList(this.list);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnUpSureClick, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnUpSureClick, this);
        this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return GodDieBossReward;
}(ui.GodDieBossRewardSkin));
__reflect(GodDieBossReward.prototype, "GodDieBossReward", ["IAlert", "egret.DisplayObject"]);
