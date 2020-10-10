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
var MainChapterRewardAlter = (function (_super) {
    __extends(MainChapterRewardAlter, _super);
    function MainChapterRewardAlter() {
        var _this = _super.call(this) || this;
        _this._count = 0;
        _this._angle = 0;
        _this._chapterId = 0;
        return _this;
    }
    MainChapterRewardAlter.prototype.show = function (chapterId, type) {
        if (type === void 0) { type = 1; }
        this._temp = null;
        this._chapterReward = 0;
        this._chapterId = chapterId;
        this._rewards = "";
        this._type = type;
        this._temp = GameModels.chapter.getChapterRewardBuyNowChapter();
        this.showView();
        egret.Tween.removeTweens(this.img_ratoion);
        this.tweenPreviewImgHandler();
        this.btn1.label = type == 1 ? Language.C_QWGC : Language.C_QD;
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    MainChapterRewardAlter.prototype.showView = function () {
        if (!this._temp)
            return;
        this.labChapter.text = this._temp.order.toString();
        var rewards = this._temp.rewards.split("|");
        this._chapterReward = GameModels.chapter.chapterReward;
        this._rewards = rewards[0];
        this.item.dataSource = rewards[0];
        this.imgRewardTitle.source = "img_rewardTitle_png";
        if (this._chapterReward == this._temp.chapterId) {
            this.btn1.label = Language.C_LJLQ;
            this.btn1.skinName = "skins.SnapBigButton3Skin";
        }
        else {
            this.btn1.label = this._type == 1 ? Language.C_QWGC : Language.C_QD;
            this.btn1.skinName = "skins.SnapBigButton2Skin";
        }
    };
    MainChapterRewardAlter.prototype.onBtnClick = function (e) {
        if (this._chapterReward == this._temp.chapterId) {
            GameModels.chapter.requestChapterGetReward(0, utils.Handler.create(this, function () {
                mg.alertManager.tip(Language.C_LQCG);
                if (this._temp.id != 2) {
                    var flyItem = new s.FlyIconsEffect();
                    flyItem.initializeConfigStr(this._rewards, this.item.localToGlobal(45, 45), mg.layerManager.top);
                    flyItem.start();
                }
                this.dispatchEventWith(egret.Event.CLOSE);
            }));
        }
        else {
            this.dispatchEventWith(egret.Event.CLOSE);
        }
    };
    MainChapterRewardAlter.prototype.tweenPreviewImgHandler = function () {
        this._count++;
        this._angle = this._count * 360;
        egret.Tween.get(this.img_ratoion).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
    };
    MainChapterRewardAlter.prototype.hide = function () {
        if (GameModels.limitTarget.isShowView == 1) {
            mg.uiManager.show(MainPresentZhuGeLiangAlter, true);
            GameModels.limitTarget.isShowView = 0;
        }
        this._count = 0;
        this._angle = 0;
        this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        egret.Tween.removeTweens(this.img_ratoion);
        GameModels.chapter.updateCloseAlter();
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return MainChapterRewardAlter;
}(ui.MainChapterRewardAlterSkin));
__reflect(MainChapterRewardAlter.prototype, "MainChapterRewardAlter", ["IAlert", "egret.DisplayObject"]);
