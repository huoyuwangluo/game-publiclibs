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
var smokePetJiFenReward = (function (_super) {
    __extends(smokePetJiFenReward, _super);
    function smokePetJiFenReward() {
        return _super.call(this) || this;
    }
    smokePetJiFenReward.prototype.show = function () {
        this.labContent.textFlow = (new egret.HtmlTextParser).parser(Language.getExpression(Language.E_JFJL, 1000));
        if (GameModels.smokepet.score < 1000) {
            this.btnOk.touchEnabled = false;
            this.btnOk.filters = utils.filterUtil.grayFilters;
        }
        else {
            this.btnOk.touchEnabled = true;
            this.btnOk.filters = null;
        }
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    smokePetJiFenReward.prototype.onBtnClick = function (e) {
        var _this = this;
        if (e.currentTarget == this.btnClose) {
            this.dispatchEventWith(egret.Event.CLOSE);
        }
        else {
            if (GameModels.user.player.vip < 2) {
                mg.alertManager.tip(Language.J_VIPJFZM);
                return;
            }
            GameModels.smokepet.getJiFenReward(utils.Handler.create(this, function () {
                mg.alertManager.tip(Language.J_ZMCG);
                _this.dispatchEventWith(egret.Event.CLOSE);
            }));
        }
    };
    smokePetJiFenReward.prototype.hide = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return smokePetJiFenReward;
}(ui.smokePetJiFenRewardSkin));
__reflect(smokePetJiFenReward.prototype, "smokePetJiFenReward", ["IAlert", "egret.DisplayObject"]);
