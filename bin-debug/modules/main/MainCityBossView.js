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
var main;
(function (main) {
    var MainCityBossView = (function (_super) {
        __extends(MainCityBossView, _super);
        function MainCityBossView() {
            var _this = _super.call(this) || this;
            _this._setp = 0;
            return _this;
        }
        MainCityBossView.prototype.init = function () {
            this._parent = this.parent;
            this.expBar.slideDuration = 0;
            this.expBar.visible = true;
            this.countLabel.visible = false;
            this.imgIcon.source = "uiMain_activityNotice_json.main_cityBoss_Icon";
            this.progressUpdate();
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        };
        MainCityBossView.prototype.updateLableTime = function () {
            if (this._time <= 0) {
                return;
            }
            this.countLabel.text = utils.DateUtil.formatTimeLeft(this._time);
            this._time--;
        };
        MainCityBossView.prototype.finshTime = function () {
            this.countLabel.text = Language.C_YJS;
            utils.timer.clear(this, this.updateLableTime);
        };
        MainCityBossView.prototype.progressUpdate = function () {
            var bosslist = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_CITY);
            var angry = 0;
            var hp = 0;
            var resId;
            for (var i = 0; i < bosslist.length; i++) {
                if (angry < (bosslist[i].curAngry / bosslist[i].maxAngry)) {
                    if ((bosslist[i].curAngry / bosslist[i].maxAngry) < 1) {
                        angry = bosslist[i].curAngry / bosslist[i].maxAngry;
                        resId = bosslist[i].templateBoss.resId;
                        this._setp = i;
                    }
                    if ((bosslist[i].curAngry / bosslist[i].maxAngry) == 1 && (bosslist[i].bossHP > 0)) {
                        angry = bosslist[i].curAngry / bosslist[i].maxAngry;
                        resId = bosslist[i].templateBoss.resId;
                        this._setp = i;
                    }
                }
            }
            if (angry >= 0.8) {
                this.expBar.maximum = 100;
                this.expBar.value = Math.floor(angry * 100);
                // this.img.source=ResPath.getBossIconCircle(resId);
            }
            else {
                this.remove();
            }
        };
        MainCityBossView.prototype.clear = function () {
        };
        MainCityBossView.prototype.add = function () {
            if (!this.parent) {
                this._parent.addChild(this);
                this._parent.touchEnabled = this._parent.touchChildren = true;
                this.expBar.visible = true;
                this.countLabel.visible = false;
                this.imgIcon.source = "uiMain_activityNotice_json.main_cityBoss_Icon";
                this.progressUpdate();
            }
            ;
        };
        MainCityBossView.prototype.remove = function () {
            if (this.parent) {
                utils.timer.clear(this, this.updateLableTime);
                this.parent.removeChild(this);
                //this._parent.touchEnabled=this._parent.touchChildren=false;
            }
        };
        MainCityBossView.prototype.touchHandler = function (e) {
            egret.Tween.removeTweens(this);
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.scaleX = this.scaleY = 1;
                    egret.Tween.get(this).to({
                        scaleX: 0.9,
                        scaleY: 0.9,
                    }, 300, utils.Ease.cubicOut);
                    this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 300, utils.Ease.circOut);
                    if (this.imgIcon.source == "uiMain_activityNotice_json.main_cityBoss_Icon") {
                        mg.uiManager.show(dialog.explore.CopyFightBossDialog, { tabIndex: 6, param: this._setp });
                    }
                    if (this)
                        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    break;
            }
        };
        return MainCityBossView;
    }(ui.MainCityBossSkin));
    main.MainCityBossView = MainCityBossView;
    __reflect(MainCityBossView.prototype, "main.MainCityBossView");
})(main || (main = {}));
