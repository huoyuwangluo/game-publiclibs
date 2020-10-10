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
    var yuanZheng;
    (function (yuanZheng) {
        var BingFenSanLuChoose = (function (_super) {
            __extends(BingFenSanLuChoose, _super);
            function BingFenSanLuChoose() {
                var _this = _super.call(this) || this;
                _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3, _this.reward4, _this.reward5];
                return _this;
            }
            BingFenSanLuChoose.prototype.show = function () {
                GameModels.legion.isOpenBingFenSanLuView = true;
                var dataSet1 = GameModels.dataSet.getDataSettingValueById("880001");
                var dataSet2 = GameModels.dataSet.getDataSettingValueById("880002");
                var dataSet3 = GameModels.dataSet.getDataSettingValueById("880003");
                var strArr = (dataSet1 + ";" + dataSet2 + ";" + dataSet3).split(";");
                for (var i = 0; i < strArr.length; i++) {
                    this._rwards[i].dataSource = strArr[i];
                }
                this.btnChoose1.touchEnabled = false;
                this.btnChoose1.filters = utils.filterUtil.grayFilters;
                this.btnChoose2.touchEnabled = false;
                this.btnChoose2.filters = utils.filterUtil.grayFilters;
                this.btnChoose3.touchEnabled = false;
                this.btnChoose3.filters = utils.filterUtil.grayFilters;
                if (GameModels.sgActivity.getCurrWeek() == 7) {
                    this.btnChoose1.touchEnabled = true;
                    this.btnChoose1.filters = null;
                    this.btnChoose2.touchEnabled = true;
                    this.btnChoose2.filters = null;
                    this.btnChoose3.touchEnabled = true;
                    this.btnChoose3.filters = null;
                }
                else {
                    if (GameModels.sgActivity.getCurrWeek() == 1 || GameModels.sgActivity.getCurrWeek() == 4) {
                        this.btnChoose1.touchEnabled = true;
                        this.btnChoose1.filters = null;
                    }
                    if (GameModels.sgActivity.getCurrWeek() == 2 || GameModels.sgActivity.getCurrWeek() == 5) {
                        this.btnChoose2.touchEnabled = true;
                        this.btnChoose2.filters = null;
                    }
                    if (GameModels.sgActivity.getCurrWeek() == 3 || GameModels.sgActivity.getCurrWeek() == 6) {
                        this.btnChoose3.touchEnabled = true;
                        this.btnChoose3.filters = null;
                    }
                }
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnChoose1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnChoose2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnChoose3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            };
            BingFenSanLuChoose.prototype.clickHandler = function (e) {
                switch (e.currentTarget) {
                    case this.btnBack:
                        this.dispatchEventWith(egret.Event.CLOSE);
                        break;
                    case this.btnClose:
                        this.dispatchEventWith(egret.Event.CLOSE);
                        break;
                    case this.btnChoose1:
                        if (GameModels.sgActivity.getCurrWeek() == 1 || GameModels.sgActivity.getCurrWeek() == 4 || GameModels.sgActivity.getCurrWeek() == 7) {
                            this.dispatchEventWith(egret.Event.CLOSE);
                            GameModels.shilita.currIndex = 1;
                            mg.uiManager.show(dialog.yuanZheng.BingFenSanLu);
                        }
                        else {
                            mg.alertManager.tip(Language.J_HDWKQ);
                        }
                        break;
                    case this.btnChoose2:
                        if (GameModels.sgActivity.getCurrWeek() == 2 || GameModels.sgActivity.getCurrWeek() == 5 || GameModels.sgActivity.getCurrWeek() == 7) {
                            this.dispatchEventWith(egret.Event.CLOSE);
                            GameModels.shilita.currIndex = 2;
                            mg.uiManager.show(dialog.yuanZheng.BingFenSanLu);
                        }
                        else {
                            mg.alertManager.tip(Language.J_HDWKQ);
                        }
                        break;
                    case this.btnChoose3:
                        if (GameModels.sgActivity.getCurrWeek() == 3 || GameModels.sgActivity.getCurrWeek() == 6 || GameModels.sgActivity.getCurrWeek() == 7) {
                            this.dispatchEventWith(egret.Event.CLOSE);
                            GameModels.shilita.currIndex = 3;
                            mg.uiManager.show(dialog.yuanZheng.BingFenSanLu);
                        }
                        else {
                            mg.alertManager.tip(Language.J_HDWKQ);
                        }
                        break;
                    case this.imgHelp:
                        mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 5701).des);
                        break;
                }
            };
            BingFenSanLuChoose.prototype.hide = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnChoose1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnChoose2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnChoose3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            return BingFenSanLuChoose;
        }(ui.BingFenSanLuChooseSkin));
        yuanZheng.BingFenSanLuChoose = BingFenSanLuChoose;
        __reflect(BingFenSanLuChoose.prototype, "dialog.yuanZheng.BingFenSanLuChoose", ["IAlert", "egret.DisplayObject"]);
    })(yuanZheng = dialog.yuanZheng || (dialog.yuanZheng = {}));
})(dialog || (dialog = {}));
