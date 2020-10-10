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
var RandomReward = (function (_super) {
    __extends(RandomReward, _super);
    function RandomReward() {
        return _super.call(this) || this;
    }
    RandomReward.prototype.show = function (randomId, petRefId, randomRewardStr) {
        this._randomId = randomId ? randomId : 0;
        this._petRefId = petRefId ? petRefId : 0;
        var randomTemp = Templates.getTemplateById(templates.Map.RANDOMREWARD, this._randomId);
        if (!randomTemp)
            return;
        var petTmp = Templates.getTemplateById(templates.Map.GENERAL, this._petRefId);
        if (!petTmp)
            return;
        this.body.setPetBody(petTmp.model);
        this.item.dataSource = randomRewardStr;
        var random = 0;
        if (randomTemp.type == 1) {
            random = Math.floor(Math.random() * 3 + 1);
            this.imgTitle.source = "img_petReward_" + random + "_png";
        }
        else if (randomTemp.type == 2) {
            this.imgTitle.source = "img_hongYan_" + randomTemp.id + "_png";
        }
        else {
            random = Math.floor(Math.random() * 3 + 1);
            this.imgTitle.source = "img_baoWu_" + random + "_png";
        }
        this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        if (GameModels.task.hasTask && GameModels.task.curTask.type == TypeTask.SHENGZHI) {
            utils.timer.once(400, this, function () {
                mg.guideManager.guideImmediately(this.btnOk, Language.J_DJGB, TypeDirection.UP);
            });
        }
    };
    RandomReward.prototype.onBtnClick = function (e) {
        this.item.playFlyItem();
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    RandomReward.prototype.hide = function () {
        this.btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return RandomReward;
}(ui.RandomRewardSkin));
__reflect(RandomReward.prototype, "RandomReward", ["IAlert", "egret.DisplayObject"]);
