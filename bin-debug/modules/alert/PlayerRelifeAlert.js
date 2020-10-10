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
var copy;
(function (copy) {
    var PlayerRelifeAlert = (function (_super) {
        __extends(PlayerRelifeAlert, _super);
        function PlayerRelifeAlert() {
            var _this = _super.call(this) || this;
            _this._totalTime = 10;
            _this._cost = 100;
            _this._lostContent = "";
            return _this;
        }
        PlayerRelifeAlert.prototype.show = function (killlerName, lostContent, totalTime, cost, caller, relifeMethod, type) {
            if (type === void 0) { type = Language.C_LJFH; }
            this.visible = true;
            this.updataThisPos();
            this._cost = cost;
            this._killlerName = killlerName;
            this._totalTime = totalTime;
            this._lostContent = lostContent;
            this.labDiamond.text = this._cost + '';
            if (this._relifeHandler) {
                this._relifeHandler.recover();
                this._relifeHandler = null;
            }
            this._relifeHandler = utils.Handler.create(caller, relifeMethod, null, false);
            utils.timer.clear(this, this.timerHandler);
            utils.timer.loop(1000, this, this.timerHandler);
            this.timerHandler();
            this.btnRelife.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickHandler, this);
        };
        PlayerRelifeAlert.prototype.hide = function () {
            //if (this.visible == true) {
            this.btnRelife.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickHandler, this);
            utils.timer.clear(this, this.timerHandler);
            if (this._relifeHandler) {
                this._relifeHandler.recover();
                this._relifeHandler = null;
            }
            this.visible = false;
            //}
        };
        PlayerRelifeAlert.prototype.clickHandler = function (e) {
            switch (e.currentTarget) {
                case this.btnRelife:
                    if (GameModels.user.player.diamonds < this._cost) {
                        mg.alertManager.tip(Language.J_MSBZ);
                        return;
                    }
                    if (this._relifeHandler) {
                        this._relifeHandler.runWith(true);
                    }
                    this.hide();
                    break;
            }
        };
        PlayerRelifeAlert.prototype.timerHandler = function () {
            if (this._lostContent != "") {
                this.labText.text = Language.getExpression(Language.E_NB1JB2MHZDFH2, this._killlerName, this._lostContent, this._totalTime);
            }
            else {
                this.labText.text = Language.getExpression(Language.E_NB1JB2MHZDFH, this._killlerName, this._totalTime);
            }
            this._totalTime--;
            if (this._totalTime <= 0) {
                if (this._relifeHandler) {
                    this._relifeHandler.runWith(false);
                }
                this.hide();
            }
        };
        PlayerRelifeAlert.prototype.updataThisPos = function () {
            if (this.visible == true) {
                this.bottom = copy.CopyMainView.instance.shieldReward.visible ? 430 : 300;
            }
        };
        return PlayerRelifeAlert;
    }(ui.PlayerDeadTipSkin));
    copy.PlayerRelifeAlert = PlayerRelifeAlert;
    __reflect(PlayerRelifeAlert.prototype, "copy.PlayerRelifeAlert");
})(copy || (copy = {}));
