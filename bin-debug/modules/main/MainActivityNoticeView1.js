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
    var MainActivityNoticeView1 = (function (_super) {
        __extends(MainActivityNoticeView1, _super);
        function MainActivityNoticeView1() {
            var _this = _super.call(this) || this;
            /**显示异族来袭*/
            _this.STATE_PRE = 1; //1.预告
            _this.STATE_START = 2; //2.开始
            _this.STATE_END = 3; //3.结束
            _this._isInit = true;
            return _this;
        }
        MainActivityNoticeView1.prototype.init = function () {
            this._isInit = true;
            this._parent = this.parent;
            GameModels.activityNotice.requestActivityStatus();
            GameModels.activityNotice.addEventListener(mo.ModelActivityNotice.ACTIVITY_NOTICE_UPDATA, this.updateDisplay, this);
            app.gameContext.manager.onGameChange(this, this.updateDisplay, true);
            this.updateDisplay();
        };
        MainActivityNoticeView1.prototype.updateDisplay = function () {
            this.remove();
            this.add();
        };
        MainActivityNoticeView1.prototype.add = function () {
            if (GameModels.user.player.level < 70) {
                return;
            }
            if (!TypeGame.isMainOrCityGame(app.gameContext.typeGame)) {
                return;
            }
            if (!GameModels.activityNotice.getOpenActivityIdData(mo.ModelActivityNotice.YIZHULAIXI) ||
                GameModels.activityNotice.getOpenActivityIdData(mo.ModelActivityNotice.YIZHULAIXI).state == this.STATE_END ||
                !this.hasCurActivityTime()) {
                return;
            }
            if (this._parent) {
                this._parent.addChild(this);
                this._parent.x = mg.stageManager.stageWidth - this._parent.width;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openView, this);
            this.imgIcon.source = "uiMain_activityNotice_json.main_activityNotice_icon" + 5;
            this.startTime();
        };
        MainActivityNoticeView1.prototype.getCurActivityLastTime = function () {
            return (GameModels.activityNotice.getOpenActivityIdData(mo.ModelActivityNotice.YIZHULAIXI).endTime - GameModels.timer.getTimer()) / 1000;
        };
        /**当前活动是否还有剩余时间 */
        MainActivityNoticeView1.prototype.hasCurActivityTime = function () {
            return this.getCurActivityLastTime() > 0;
        };
        MainActivityNoticeView1.prototype.remove = function () {
            this.stopTime();
            if (this.parent) {
                this.parent.removeChild(this);
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openView, this);
            }
        };
        MainActivityNoticeView1.prototype.openView = function (e) {
            mg.uiManager.show(dialog.battlefield.BattlefieldMonster);
        };
        MainActivityNoticeView1.prototype.startTime = function () {
            utils.timer.loop(1000, this, this.timerHandler);
            this.timerHandler();
        };
        MainActivityNoticeView1.prototype.stopTime = function () {
            utils.timer.clear(this, this.timerHandler);
        };
        MainActivityNoticeView1.prototype.timerHandler = function () {
            if (!this.hasCurActivityTime()) {
                this.remove();
                return;
            }
            var str = utils.DateUtil.formatTimeLeft(this.getCurActivityLastTime());
            switch (GameModels.activityNotice.getOpenActivityIdData(mo.ModelActivityNotice.YIZHULAIXI).state) {
                case this.STATE_PRE:
                    this.countLabel.text = Language.getExpression(Language.E_1HKS, str);
                    break;
                case this.STATE_START:
                    this.countLabel.text = Language.getExpression(Language.E_1HJSA, str);
                    break;
            }
        };
        return MainActivityNoticeView1;
    }(ui.ActivityNoticeSkin));
    main.MainActivityNoticeView1 = MainActivityNoticeView1;
    __reflect(MainActivityNoticeView1.prototype, "main.MainActivityNoticeView1");
})(main || (main = {}));
