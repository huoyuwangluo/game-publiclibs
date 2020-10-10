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
    /**显示逐鹿中原 */
    var MainLoseBossView = (function (_super) {
        __extends(MainLoseBossView, _super);
        function MainLoseBossView(group) {
            var _this = _super.call(this) || this;
            _this._layer = group;
            _this.countLabel.text = "";
            return _this;
        }
        MainLoseBossView.prototype.add = function () {
            if (this.checkIconShow() != 0) {
                this.showLoseIcon();
                this._type = "lose";
            }
            else {
                this.remove();
                this._type = "";
            }
        };
        MainLoseBossView.prototype.remove = function () {
            if (this.parent) {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openView, this);
                this._layer.removeChild(this);
                utils.timer.clearAll(this);
            }
        };
        MainLoseBossView.prototype.iconAdd = function () {
            if (!this.parent) {
                this._layer.addChild(this);
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openView, this);
                utils.timer.loop(1000, this, this.updateLab);
            }
        };
        MainLoseBossView.prototype.openView = function (e) {
            if (this.imgIcon.source == "uiMain_activityNotice_json.main_activityNotice_icon98") {
                mg.uiManager.show(dialog.explore.CopyFightBossDialog, { tabIndex: 4 });
            }
        };
        MainLoseBossView.prototype.updateLab = function () {
            var str = '';
            if (this._type == "lose") {
                str = utils.DateUtil.formatTimeLeft(this._timeCount).substr(3);
                if (this.checkIconShow() < 0) {
                    this.countLabel.text = Language.getExpression(Language.E_1HKQ, str);
                }
                else {
                    this.countLabel.text = Language.getExpression(Language.E_1HJS, str);
                }
            }
            else if (this._type == "wukong") {
                str = utils.DateUtil.formatTimeLeft(this._timeCount);
                if (this._timeCount > 0) {
                    this.countLabel.text = str;
                }
            }
            this._timeCount--;
            if (this._timeCount <= 0) {
                this.add();
            }
        };
        MainLoseBossView.prototype.showLoseIcon = function () {
            if (GameModels.user.player.level < 100) {
                return;
            }
            this._timeCount = Math.abs(this.checkIconShow());
            this.iconAdd();
            this.imgIcon.source = "uiMain_activityNotice_json.main_activityNotice_icon98";
        };
        //魔域
        MainLoseBossView.prototype.checkIconShow = function () {
            if (!this._tampArr) {
                this._tampArr = GameModels.copyBoss.getOpenTimeArr();
            }
            var nowTime = GameModels.timer.getPastSecond();
            for (var i = 0; i < this._tampArr.length; i++) {
                if ((nowTime + 900) > this._tampArr[i][0] && nowTime < this._tampArr[i][1]) {
                    if (nowTime < this._tampArr[i][0]) {
                        return -(this._tampArr[i][0] - nowTime);
                    }
                    else {
                        return this._tampArr[i][1] - nowTime;
                    }
                }
            }
            return 0;
        };
        return MainLoseBossView;
    }(ui.ActivityNoticeSkin));
    main.MainLoseBossView = MainLoseBossView;
    __reflect(MainLoseBossView.prototype, "main.MainLoseBossView");
})(main || (main = {}));
