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
var MainChapterCityReward = (function (_super) {
    __extends(MainChapterCityReward, _super);
    function MainChapterCityReward() {
        var _this = _super.call(this) || this;
        _this._count = 0;
        _this._angle = 0;
        return _this;
    }
    MainChapterCityReward.prototype.show = function (isQiangzheng) {
        if (isQiangzheng === void 0) { isQiangzheng = false; }
        //701 101 301
        this._isQiangZheng = isQiangzheng;
        if (GameModels.user.player.level > GameModels.common.oldLevel) {
            this._lvMovie = new s.DragonBoneMovieClip(s.DragonBoneMovieClip.ARMATURE);
            this._lvMovie.resId = "jiesuan_lvup";
            var sCurr = "" + GameModels.common.oldLevel;
            var sNext = "" + GameModels.user.player.level;
            var animationName = "gg";
            if (sCurr.length == 1) {
                if (sNext.length == 1) {
                    animationName = "gg";
                    this._lvMovie.replaceSlotImage("lv3", sCurr[0] ? "chapterMap_json." + sCurr[0] : "");
                    this._lvMovie.replaceSlotImage("lv6", sNext[0] ? "chapterMap_json." + sNext[0] : "");
                }
                else {
                    animationName = "gs";
                    this._lvMovie.replaceSlotImage("lv3", sCurr[0] ? "chapterMap_json." + sCurr[0] : "");
                    this._lvMovie.replaceSlotImage("lv5", sNext[0] ? "chapterMap_json." + sNext[0] : "");
                    this._lvMovie.replaceSlotImage("lv6", sNext[1] ? "chapterMap_json." + sNext[1] : "");
                }
            }
            else if (sCurr.length == 2) {
                if (sNext.length == 2) {
                    animationName = "ss";
                    this._lvMovie.replaceSlotImage("lv2", sCurr[0] ? "chapterMap_json." + sCurr[0] : "");
                    this._lvMovie.replaceSlotImage("lv3", sCurr[1] ? "chapterMap_json." + sCurr[1] : "");
                    this._lvMovie.replaceSlotImage("lv5", sNext[0] ? "chapterMap_json." + sNext[0] : "");
                    this._lvMovie.replaceSlotImage("lv6", sNext[1] ? "chapterMap_json." + sNext[1] : "");
                }
                else {
                    animationName = "sb";
                    this._lvMovie.replaceSlotImage("lv2", sCurr[0] ? "chapterMap_json." + sCurr[0] : "");
                    this._lvMovie.replaceSlotImage("lv3", sCurr[1] ? "chapterMap_json." + sCurr[1] : "");
                    this._lvMovie.replaceSlotImage("lv4", sNext[0] ? "chapterMap_json." + sNext[0] : "");
                    this._lvMovie.replaceSlotImage("lv5", sNext[1] ? "chapterMap_json." + sNext[1] : "");
                    this._lvMovie.replaceSlotImage("lv6", sNext[2] ? "chapterMap_json." + sNext[2] : "");
                }
            }
            else {
                animationName = "bb";
                this._lvMovie.replaceSlotImage("lv1", sCurr[0] ? "chapterMap_json." + sCurr[0] : "");
                this._lvMovie.replaceSlotImage("lv2", sCurr[1] ? "chapterMap_json." + sCurr[1] : "");
                this._lvMovie.replaceSlotImage("lv3", sCurr[2] ? "chapterMap_json." + sCurr[2] : "");
                this._lvMovie.replaceSlotImage("lv4", sNext[0] ? "chapterMap_json." + sNext[0] : "");
                this._lvMovie.replaceSlotImage("lv5", sNext[1] ? "chapterMap_json." + sNext[1] : "");
                this._lvMovie.replaceSlotImage("lv6", sNext[2] ? "chapterMap_json." + sNext[2] : "");
            }
            this._lvMovie.x = 330;
            this._lvMovie.y = 80;
            this.addChild(this._lvMovie);
            this._lvMovie.playOnce(animationName);
        }
        this.imgTitle.source = isQiangzheng ? "img_mianMap_qiangzheng_png" : "img_mianMap_zhengshou_png";
        this.timeGroup.visible = !isQiangzheng;
        this.labCount.text = utils.DateUtil.formatTimeLeft(GameModels.common.offLineTime);
        this.head.setHeadInfo(GameModels.user.player.headIcon, GameModels.user.player.level);
        this.expProgress.noTweenValue = GameModels.user.player.exp / GameModels.user.player.maxExp;
        this.labExpValue.text = GameModels.user.player.exp + "/" + GameModels.user.player.roleLvTemplates.needExp;
        var temFood = Templates.getTemplateById(templates.Map.ITEM, 701);
        this.iconFood.source = temFood.icon;
        this.labFood.text = GameModels.common.food + "";
        this.labFood0.text = temFood.name;
        var temGold = Templates.getTemplateById(templates.Map.ITEM, 101);
        this.iconGold.source = temGold.icon;
        this.labGold.text = GameModels.common.gold + "";
        this.labGold0.text = temGold.name;
        var temExp = Templates.getTemplateById(templates.Map.ITEM, 301);
        // this.iconExp.source = temExp.icon;
        this.labExp.text = GameModels.common.exp + "";
        this.labExp0.text = temExp.name;
        if (!this._listData) {
            this._listData = new eui.ArrayCollection(GameModels.common.voArr);
        }
        else {
            this._listData.source = GameModels.common.voArr;
        }
        this.list.dataProvider = this._listData;
        this.labGo.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_QWJH);
        if (GameModels.platform.isPay && GameModels.vip && !GameModels.vip.getRewardBuyType(5)) {
            this.labGo.visible = true;
        }
        else {
            this.labGo.visible = false;
        }
        egret.Tween.removeTweens(this.img_ratoion);
        this.tweenPreviewImgHandler();
        // this.labGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGo, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    MainChapterCityReward.prototype.onClick = function (e) {
        logger.log("111111111111111X=", e.stageX);
        logger.log("111111111111111Y=", e.stageY);
        var pos = this.group.localToGlobal();
        logger.log("222222222222222X=", pos.x);
        logger.log("222222222222222Y=", pos.y);
        var groupStartPosX = pos.x;
        var groupEndPosX = pos.x + this.group.width;
        var groupStartPosY = pos.y;
        var groupEndPosY = pos.y + this.group.height;
        switch (e.target) {
            case this.labGo:
                mg.uiManager.show(view.vip.VipMianDailog, { tabIndex: 1, param: 5 });
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            default:
                if (e.stageX > groupStartPosX && e.stageX < groupEndPosX && e.stageY > groupStartPosY && e.stageY < groupEndPosY) {
                    return;
                }
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
        }
    };
    // private onGo(): void {
    // 	mg.uiManager.show(view.vip.VipMianDailog, { tabIndex: 1 });
    // 	this.dispatchEventWith(egret.Event.CLOSE);
    // }
    MainChapterCityReward.prototype.tweenPreviewImgHandler = function () {
        this._count++;
        this._angle = this._count * 360;
        egret.Tween.get(this.img_ratoion).to({ rotation: this._angle }, 2000 * this._count).call(this.tweenPreviewImgHandler, this);
    };
    MainChapterCityReward.prototype.hide = function () {
        if (this._lvMovie)
            this._lvMovie.stop();
        if (this._lvMovie && this._lvMovie.parent) {
            this._lvMovie.parent.removeChild(this._lvMovie);
            this._lvMovie = null;
        }
        this._count = 0;
        this._angle = 0;
        // this.labGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGo, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        egret.Tween.removeTweens(this.img_ratoion);
        this.clearList(this.list);
        if (this._isQiangZheng) {
            if (GameModels.user.player.totalRecharge <= 0) {
                var view1 = game.state.getItem(GameModels.user.player.uid, TypeSetting.SHOWVIEW_1);
                if (!view1) {
                    game.state.setItem(GameModels.user.player.uid, TypeSetting.SHOWVIEW_1, true);
                    mg.uiManager.show(dialog.firstrecharge.FirstRechargeDialog1);
                }
            }
            else {
                var view2 = game.state.getItem(GameModels.user.player.uid, TypeSetting.SHOWVIEW_3);
                if (!view2 && GameModels.user.player.vip == 1) {
                    var voMRCZ = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
                    if (voMRCZ && !voMRCZ.hashYYQGAndMRCZReceive) {
                        game.state.setItem(GameModels.user.player.uid, TypeSetting.SHOWVIEW_3, true);
                        mg.uiManager.show(dialog.activity.sgDailyActivityMainDialog, { tabIndex: game.sgActivityType.mrcz });
                    }
                }
            }
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return MainChapterCityReward;
}(ui.MainChapterCityRewardSkin));
__reflect(MainChapterCityReward.prototype, "MainChapterCityReward", ["IAlert", "egret.DisplayObject"]);
