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
    var MainActivityNoticeView = (function (_super) {
        __extends(MainActivityNoticeView, _super);
        function MainActivityNoticeView() {
            var _this = _super.call(this) || this;
            /**显示无双战场，王者疆场*/
            _this.STATE_PRE = 1; //1.预告
            _this.STATE_START = 2; //2.开始
            _this.STATE_END = 3; //3.结束
            _this._isInit = true;
            return _this;
        }
        MainActivityNoticeView.prototype.init = function () {
            this._isInit = true;
            this._parent = this.parent;
            GameModels.activityNotice.requestActivityStatus();
            GameModels.activityNotice.addEventListener(mo.ModelActivityNotice.ACTIVITY_NOTICE_UPDATA, this.updateDisplay, this);
            app.gameContext.manager.onGameChange(this, this.updateDisplay, true);
            this.updateDisplay();
        };
        MainActivityNoticeView.prototype.updateDisplay = function () {
            this.remove();
            this.add();
        };
        MainActivityNoticeView.prototype.add = function () {
            if (GameModels.user.player.level < 80) {
                return;
            }
            if (!TypeGame.isMainOrCityGame(app.gameContext.typeGame)) {
                return;
            }
            if (!GameModels.activityNotice.curActivityTemplate ||
                GameModels.activityNotice.curActivityState == this.STATE_END ||
                !GameModels.activityNotice.hasCurActivityTime) {
                return;
            }
            if (this.unNeedActivityIdBoo(GameModels.activityNotice.curActivityId)) {
                return;
            }
            if (this._parent) {
                this._parent.addChild(this);
                this._parent.x = mg.stageManager.stageWidth - this._parent.width;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openView, this);
            this.imgIcon.source = "uiMain_activityNotice_json.main_activityNotice_icon" + GameModels.activityNotice.curActivityTemplate.type;
            this.startTime();
        };
        MainActivityNoticeView.prototype.remove = function () {
            this.stopTime();
            if (this.parent) {
                this.parent.removeChild(this);
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openView, this);
            }
        };
        //是否是不需要的活动id
        MainActivityNoticeView.prototype.unNeedActivityIdBoo = function (id) {
            var unNeedIds = [201, 401, 501, 601, 10101, 10201, 10301, 10401, 10501, 10601, 801, 802, 803, 1101, 1102, 1103, 1201, 1202, 1203, 1204];
            if (unNeedIds.indexOf(id) != -1)
                return true;
            return false;
        };
        MainActivityNoticeView.prototype.openView = function (e) {
            if (GameModels.activityNotice.curActivityId == 101) {
                if (!GameModels.user.player.legionId) {
                    mg.alertManager.tip(Language.J_SFJRJT);
                    return;
                }
                mg.uiManager.show(dialog.battlefield.BattlefieldUnion);
            }
            else if (GameModels.activityNotice.curActivityId == 301) {
                mg.uiManager.show(dialog.limitactivities.KingBattlefieldDialog);
            }
        };
        MainActivityNoticeView.prototype.startTime = function () {
            utils.timer.loop(1000, this, this.timerHandler);
            this.timerHandler();
        };
        MainActivityNoticeView.prototype.stopTime = function () {
            utils.timer.clear(this, this.timerHandler);
        };
        MainActivityNoticeView.prototype.timerHandler = function () {
            if (!GameModels.activityNotice.hasCurActivityTime) {
                this.remove();
                return;
            }
            var str = utils.DateUtil.formatTimeLeft(GameModels.activityNotice.curActivityLastTime).substr(3);
            switch (GameModels.activityNotice.curActivityState) {
                case this.STATE_PRE:
                    this.countLabel.text = Language.getExpression(Language.E_1HKS, str);
                    break;
                case this.STATE_START:
                    this.countLabel.text = Language.getExpression(Language.E_1HJSA, str);
                    break;
            }
        };
        return MainActivityNoticeView;
    }(ui.ActivityNoticeSkin));
    main.MainActivityNoticeView = MainActivityNoticeView;
    __reflect(MainActivityNoticeView.prototype, "main.MainActivityNoticeView");
})(main || (main = {}));
