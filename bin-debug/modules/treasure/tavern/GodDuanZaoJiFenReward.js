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
var GodDuanZaoJiFenReward = (function (_super) {
    __extends(GodDuanZaoJiFenReward, _super);
    function GodDuanZaoJiFenReward() {
        return _super.call(this) || this;
    }
    GodDuanZaoJiFenReward.prototype.show = function (type) {
        this._type = type;
        if (this._type == 1) {
            this.labContent.textFlow = (new egret.HtmlTextParser).parser(Language.getExpression(Language.E_JFLQ, 1000));
            if (GameModels.tavern.gdScore < 1000) {
                this.btnOk.touchEnabled = false;
                this.btnOk.filters = utils.filterUtil.grayFilters;
            }
            else {
                this.btnOk.touchEnabled = true;
                this.btnOk.filters = null;
            }
            this.reward.dataSource = "410902_1";
            this.imgBg.source = "imgTavern_bg4_png";
        }
        else {
            this.labContent.textFlow = (new egret.HtmlTextParser).parser(Language.getExpression(Language.E_JFLQCW, 1000));
            if (GameModels.tavern.animalScore < 1000) {
                this.btnOk.touchEnabled = false;
                this.btnOk.filters = utils.filterUtil.grayFilters;
            }
            else {
                this.btnOk.touchEnabled = true;
                this.btnOk.filters = null;
            }
            this.reward.dataSource = "411701_1";
            this.imgBg.source = "img_inamlJiFen_png";
        }
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    GodDuanZaoJiFenReward.prototype.onBtnClick = function (e) {
        var _this = this;
        if (e.currentTarget == this.btnClose) {
            this.dispatchEventWith(egret.Event.CLOSE);
        }
        else {
            if (this._type == 1) {
                GameModels.tavern.requestGodDuanZaoScoreReward(utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.C_LQCG);
                    _this.getRewardCallback();
                }));
            }
            else {
                GameModels.tavern.requestAnimalScoreReward(utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.C_LQCG);
                    _this.getRewardCallback();
                }));
            }
        }
    };
    GodDuanZaoJiFenReward.prototype.getRewardCallback = function () {
        var fromPoint = new egret.Point(mg.stageManager.stageWidth / 2, mg.stageManager.stageHeight / 2);
        mg.TipUpManager.instance.showTip(tipUps.CommenGetRewardTips, this._type == 1 ? ["410902_1"] : ["411701_1"]);
        this.show(this._type);
    };
    GodDuanZaoJiFenReward.prototype.hide = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return GodDuanZaoJiFenReward;
}(ui.GodDuanZaoJiFenRewardSkin));
__reflect(GodDuanZaoJiFenReward.prototype, "GodDuanZaoJiFenReward", ["IAlert", "egret.DisplayObject"]);
