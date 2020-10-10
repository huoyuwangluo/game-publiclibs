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
    var topBattle;
    (function (topBattle) {
        var TopBattleGuessAlert = (function (_super) {
            __extends(TopBattleGuessAlert, _super);
            function TopBattleGuessAlert() {
                return _super.call(this) || this;
            }
            TopBattleGuessAlert.prototype.show = function (type) {
                this._type = type;
                this._myGuessBattle = GameModels.topBattle.betBattle;
                this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.btnJiaTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.btnJianTen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.btnJia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.btnJian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.textInputNum.addEventListener(egret.Event.CHANGE, this.OnCharactorChange, this);
                var num = 100;
                this.textInputNum.text = num.toString();
                this.labHint.text = Language.J_ZDKXZ;
                var bet = GameModels.topBattle.betInfo;
                this._myCoin = GameModels.topBattle.myCoin;
                if (bet.betType == 0 && this._myCoin < 100)
                    this._myCoin = 100;
                this.labMyCount.text = Language.J_WDJCB + this._myCoin;
            };
            TopBattleGuessAlert.prototype.hide = function () {
                this._type = 0;
                this._myGuessBattle = null;
                this.btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.btnJiaTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.btnJianTen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.btnJia.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.btnJian.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.textInputNum.removeEventListener(egret.Event.CHANGE, this.OnCharactorChange, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            TopBattleGuessAlert.prototype.OnCharactorChange = function (event) {
                var num = Number(this.textInputNum.text);
                if (num < 100) {
                    this.textInputNum.text = "100";
                    num = 100;
                    mg.alertManager.tip(Language.J_ZSKXZ);
                    return;
                }
                if (num > this._myCoin && this._myCoin >= 100) {
                    this.textInputNum.text = this._myCoin.toString();
                    num = this._myCoin;
                    mg.alertManager.tip(Language.getExpression(Language.E_NDQZH1B, this._myCoin));
                    return;
                }
                if (num > 3000) {
                    this.textInputNum.text = "3000";
                    num = 3000;
                    mg.alertManager.tip(Language.J_ZDKXZ);
                    return;
                }
                this.textInputNum.text = String(num);
            };
            TopBattleGuessAlert.prototype.onClick = function (e) {
                var _this = this;
                var num = Number(this.textInputNum.text);
                switch (e.target) {
                    case this.btnEnter:
                        if (this._type == 1) {
                            GameModels.topBattle.requsetTopBattleBet(this._myGuessBattle.roomId, this._myGuessBattle.leftPlayer.playerId, num, utils.Handler.create(this, function () {
                                _this.dispatchEventWith(egret.Event.CLOSE);
                                mg.alertManager.tip(Language.J_JCCG);
                            }));
                        }
                        else {
                            GameModels.topBattle.requsetTopBattleBet(this._myGuessBattle.roomId, this._myGuessBattle.rightPlayer.playerId, num, utils.Handler.create(this, function () {
                                _this.dispatchEventWith(egret.Event.CLOSE);
                                mg.alertManager.tip(Language.J_JCCG);
                            }));
                        }
                        break;
                    case this.btnJiaTen:
                        num = num + 100;
                        break;
                    case this.btnJianTen:
                        num = num - 100;
                        break;
                    case this.btnJia:
                        num = num + 10;
                        break;
                    case this.btnJian:
                        num = num - 10;
                        break;
                    case this.btnClose:
                        this.dispatchEventWith(egret.Event.CLOSE);
                        break;
                }
                if (this.textInputNum.text == "" || num < 100) {
                    this.textInputNum.text = "100";
                    num = 100;
                    mg.alertManager.tip(Language.J_ZSKXZ);
                    return;
                }
                if (num > this._myCoin && this._myCoin >= 100) {
                    this.textInputNum.text = this._myCoin.toString();
                    num = this._myCoin;
                    mg.alertManager.tip(Language.getExpression(Language.E_NDQZH1B, this._myCoin));
                    return;
                }
                if (num > 3000) {
                    this.textInputNum.text = "3000";
                    num = 3000;
                    mg.alertManager.tip(Language.J_ZDKXZ);
                    return;
                }
                this.textInputNum.text = String(num);
            };
            return TopBattleGuessAlert;
        }(ui.TopBattleGuessAlertSkin));
        topBattle.TopBattleGuessAlert = TopBattleGuessAlert;
        __reflect(TopBattleGuessAlert.prototype, "dialog.topBattle.TopBattleGuessAlert", ["IAlert", "egret.DisplayObject"]);
    })(topBattle = dialog.topBattle || (dialog.topBattle = {}));
})(dialog || (dialog = {}));
