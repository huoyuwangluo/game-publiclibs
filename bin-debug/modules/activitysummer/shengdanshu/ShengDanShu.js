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
var view;
(function (view) {
    var activity;
    (function (activity) {
        var ShengDanShu = (function (_super) {
            __extends(ShengDanShu, _super);
            function ShengDanShu() {
                return _super.call(this) || this;
            }
            ShengDanShu.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._rwards = [this.reward0, this.reward1, this.reward2, this.reward3];
            };
            ShengDanShu.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.SDSBOSS);
                if (temp) {
                    this.labDesc.text = temp.des;
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                }
                var data1 = GameModels.dataSet.getDataSettingById(470003);
                var rewards = data1.value.split(";");
                for (var i = 0; i < 4; i++) {
                    var iconBox = this._rwards[i];
                    iconBox.labName.stroke = 1;
                    if (i < rewards.length) {
                        iconBox.dataSource = rewards[i];
                        this.boxGroup.addChild(iconBox);
                    }
                    else {
                        if (iconBox.parent) {
                            iconBox.parent.removeChild(iconBox);
                        }
                    }
                }
                this.imgRedPoint.visible = GameModels.activitySummer.checkShengDanShuRedPoint();
                this.btnEnterCity.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            };
            ShengDanShu.prototype.exit = function () {
                for (var i = 0; i < 4; i++) {
                    this._rwards[i].dataSource = null;
                }
                this.btnEnterCity.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            };
            ShengDanShu.prototype.onClick = function () {
                if (app.gameContext.typeGame == TypeGame.BEGIN) {
                    mg.alertManager.tip(Language.J_QWCXSRW);
                    return;
                }
                app.gameContext.enterCity();
            };
            return ShengDanShu;
        }(ui.ShengDanShuSkin));
        activity.ShengDanShu = ShengDanShu;
        __reflect(ShengDanShu.prototype, "view.activity.ShengDanShu", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
