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
        var LegionYuanZhengChoose = (function (_super) {
            __extends(LegionYuanZhengChoose, _super);
            function LegionYuanZhengChoose() {
                var _this = _super.call(this) || this;
                _this._needLv = [150, 300, 450];
                _this._btnArr = [_this.btnChoose1, _this.btnChoose2, _this.btnChoose3];
                _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3, _this.reward4, _this.reward5];
                return _this;
            }
            LegionYuanZhengChoose.prototype.show = function () {
                var dataSet1 = GameModels.dataSet.getDataSettingValueById("871001");
                var dataSet2 = GameModels.dataSet.getDataSettingValueById("871002");
                var dataSet3 = GameModels.dataSet.getDataSettingValueById("871003");
                var strArr = (dataSet1 + ";" + dataSet2 + ";" + dataSet3).split(";");
                for (var i = 0; i < strArr.length; i++) {
                    this._rwards[i].dataSource = strArr[i];
                }
                for (var j = 0; j < this._needLv.length; j++) {
                    if (GameModels.user.player.level < this._needLv[j]) {
                        this._btnArr[j].filters = utils.filterUtil.grayFilters;
                        this._btnArr[j].label = Language.getExpression(Language.E_2JKQ, this._needLv[j]);
                    }
                    else {
                        this._btnArr[j].filters = null;
                        this._btnArr[j].label = Language.C_XZ1;
                    }
                }
                GameModels.legion.isOpenYuanZhengView = true;
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnChoose1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnChoose2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnChoose3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            };
            LegionYuanZhengChoose.prototype.clickHandler = function (e) {
                switch (e.currentTarget) {
                    case this.btnBack:
                        this.dispatchEventWith(egret.Event.CLOSE);
                        break;
                    case this.btnClose:
                        this.dispatchEventWith(egret.Event.CLOSE);
                        break;
                    case this.btnChoose1:
                        if (GameModels.user.player.level < 150) {
                            mg.alertManager.tip(Language.getExpression(Language.E_1JKFGN, 150), 0xff0000);
                            return;
                        }
                        GameModels.legion.requestExpeditionInfo(1, utils.Handler.create(this, function () {
                            this.dispatchEventWith(egret.Event.CLOSE);
                            mg.uiManager.show(dialog.yuanZheng.LegionYuanZheng);
                        }));
                        break;
                    case this.btnChoose2:
                        if (GameModels.user.player.level < 300) {
                            mg.alertManager.tip(Language.getExpression(Language.E_1JKFGN, 300), 0xff0000);
                            return;
                        }
                        GameModels.legion.requestExpeditionInfo(2, utils.Handler.create(this, function () {
                            this.dispatchEventWith(egret.Event.CLOSE);
                            mg.uiManager.show(dialog.yuanZheng.LegionYuanZheng);
                        }));
                        break;
                    case this.btnChoose3:
                        if (GameModels.user.player.level < 450) {
                            mg.alertManager.tip(Language.getExpression(Language.E_1JKFGN, 450), 0xff0000);
                            return;
                        }
                        GameModels.legion.requestExpeditionInfo(3, utils.Handler.create(this, function () {
                            this.dispatchEventWith(egret.Event.CLOSE);
                            mg.uiManager.show(dialog.yuanZheng.LegionYuanZheng);
                        }));
                        break;
                    case this.imgHelp:
                        mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 5401).des);
                        break;
                }
            };
            LegionYuanZhengChoose.prototype.hide = function () {
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
            return LegionYuanZhengChoose;
        }(ui.LegionYuanZhengChooseSkin));
        yuanZheng.LegionYuanZhengChoose = LegionYuanZhengChoose;
        __reflect(LegionYuanZhengChoose.prototype, "dialog.yuanZheng.LegionYuanZhengChoose", ["IAlert", "egret.DisplayObject"]);
    })(yuanZheng = dialog.yuanZheng || (dialog.yuanZheng = {}));
})(dialog || (dialog = {}));
