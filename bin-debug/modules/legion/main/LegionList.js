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
var LegionList = (function (_super) {
    __extends(LegionList, _super);
    function LegionList() {
        return _super.call(this) || this;
    }
    LegionList.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Mediator.getMediator(this).onAdd(this, this.enter);
        Mediator.getMediator(this).onRemove(this, this.exit);
        this._rewardArr = [this.reward0, this.reward1, this.reward2];
    };
    LegionList.prototype.enter = function (data) {
        if (GameModels.guide.guideType == mo.ModelGuide.guideType3) {
            mg.StoryManager.instance.startBigStory(135, this, null);
        }
        mg.soundManager.playViewLongSound("SoundJM_4", "LEGIONLIST");
        GameModels.legion.getLegionList(1, utils.Handler.create(this, function () {
            this.updataList();
        }));
        this.btnSuiJi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    LegionList.prototype.updataList = function () {
        this.rend1.data = GameModels.legion.legionListDataVo[0];
        this.rend2.data = GameModels.legion.legionListDataVo[1];
        this.rend3.data = GameModels.legion.legionListDataVo[2];
        var deteTemps = GameModels.dataSet.getDataSettingById(790001);
        var str = deteTemps.value.split(";");
        for (var i = 0; i < this._rewardArr.length; i++) {
            if (str[i]) {
                this._rewardArr[i].dataSource = str[i];
                this._rewardArr[i].labCount.text = "";
            }
            else {
                this._rewardArr[i].dataSource = null;
            }
        }
    };
    LegionList.prototype.exit = function () {
        this.rend1.data = null;
        this.rend1.data = null;
        this.rend1.data = null;
        this.btnSuiJi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    LegionList.prototype.onBtnClick = function (evt) {
        var _this = this;
        if (GameModels.guide.guideType == mo.ModelGuide.guideType3) {
            GameModels.guide.requestGuideDone(mo.ModelGuide.guideType3);
        }
        GameModels.legion.joinLegion(0, utils.Handler.create(this, function () {
            _this.reward0.playFlyItem();
            _this.reward1.playFlyItem();
            _this.reward2.playFlyItem();
            _this.removeThis();
            mg.uiManager.show(LegionMain);
        }));
    };
    LegionList.prototype.removeThis = function () {
        mg.uiManager.remove(this);
    };
    return LegionList;
}(ui.LegionListSkin));
__reflect(LegionList.prototype, "LegionList");
