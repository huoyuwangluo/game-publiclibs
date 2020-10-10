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
var dialog;
(function (dialog) {
    var hongYanCiHun;
    (function (hongYanCiHun) {
        var AchievementHongYanCiHun = (function (_super) {
            __extends(AchievementHongYanCiHun, _super);
            function AchievementHongYanCiHun() {
                return _super.call(this) || this;
            }
            AchievementHongYanCiHun.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            AchievementHongYanCiHun.prototype.show = function (id) {
                this._id = id;
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cihunClick, this);
                this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
                this.labCompound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                var voArr = GameModels.pet.formatUpVOList;
                var data = [];
                for (var i = 0; i < voArr.length; i++) {
                    if (voArr[i].star > 5 && !voArr[i].hongYanSkill) {
                        var obj = { petData: null, selecd: false, count: "", star: voArr[i].star };
                        obj.petData = voArr[i];
                        obj.selecd = i == 0 ? true : false;
                        obj.count = "";
                        data.push(obj);
                    }
                }
                if (data.length <= 0) {
                    this.labNo.visible = true;
                    this.labCompound.visible = true;
                    this.labCompound.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_QWHDXYHJ);
                }
                else {
                    this.labNo.visible = false;
                    this.labCompound.visible = false;
                }
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(data);
                }
                else {
                    this._listData.source = data;
                }
                this.list.dataProvider = this._listData;
                this._petVo = data[0];
                if (GameModels.guide.guideTypeClinte == mo.ModelGuide.guideType40000) {
                    utils.timer.once(200, this, function () {
                        mg.guideManager.guideImmediately(this.btnSure, Language.J_DJCH, TypeDirection.UP);
                    });
                }
            };
            AchievementHongYanCiHun.prototype.onListClick = function (e) {
                if (e.item.selecd) {
                    return;
                }
                this._petVo.selecd = false;
                this._listData.itemUpdated(this._petVo);
                e.item.selecd = !e.item.selecd;
                this._listData.itemUpdated(e.item);
                this._petVo = e.item;
            };
            AchievementHongYanCiHun.prototype.hide = function () {
                utils.timer.clear(this);
                this.clearList(this.list);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnSure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cihunClick, this);
                this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
                this.labCompound.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            AchievementHongYanCiHun.prototype.btnCloseClick = function (e) {
                if (e.currentTarget == this.labCompound) {
                    mg.uiManager.show(treasure.TreasureMain, { tabIndex: 0 });
                }
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            AchievementHongYanCiHun.prototype.cihunClick = function () {
                var _this = this;
                var voArr = this._petVo.petData;
                GameModels.guide.clinetPetId = parseInt(voArr.refId);
                GameModels.hongYan.requestHongYanMarry(this._id, voArr.uid, utils.Handler.create(this, function () {
                    if (GameModels.guide.guideTypeClinte == mo.ModelGuide.guideType40000) {
                        utils.timer.clear(_this);
                        mg.guideManager.guideStopImmediately(_this.btnSure);
                        GameModels.guide.stopClinteGuide();
                        mg.StoryManager.instance.startBigStory(117, _this, null);
                    }
                    _this.dispatchEventWith(egret.Event.CLOSE);
                }));
            };
            return AchievementHongYanCiHun;
        }(ui.AchievementHongYanCiHunSkin));
        hongYanCiHun.AchievementHongYanCiHun = AchievementHongYanCiHun;
        __reflect(AchievementHongYanCiHun.prototype, "dialog.hongYanCiHun.AchievementHongYanCiHun", ["IAlert", "egret.DisplayObject"]);
    })(hongYanCiHun = dialog.hongYanCiHun || (dialog.hongYanCiHun = {}));
})(dialog || (dialog = {}));
