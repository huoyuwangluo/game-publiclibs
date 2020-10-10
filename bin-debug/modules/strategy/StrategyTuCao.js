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
    var strategy;
    (function (strategy) {
        var StrategyTuCao = (function (_super) {
            __extends(StrategyTuCao, _super);
            function StrategyTuCao() {
                return _super.call(this) || this;
            }
            StrategyTuCao.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            StrategyTuCao.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this._msgList = [];
                this._msgList.push({ Msg: Language.J_KF, Time: (GameModels.timer.getTimer() / 1000), type: 1 });
                this.showView();
                this.labStraegy.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_CKGL);
                this.inputTxt.addEventListener(egret.FocusEvent.FOCUS_IN, this.onCharactorFocusIn, this);
                this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.labStraegy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.labClick, this);
            };
            StrategyTuCao.prototype.showView = function () {
                if (!this._listChatData) {
                    this._listChatData = new eui.ArrayCollection(this._msgList);
                }
                else {
                    this._listChatData.source = this._msgList;
                }
                this.list.dataProvider = this._listChatData;
            };
            StrategyTuCao.prototype.onCharactorFocusIn = function (event) {
                this.inputTxt.text = "";
            };
            StrategyTuCao.prototype.onClick = function (e) {
                if (this.inputTxt.text == "") {
                    mg.alertManager.tip(Language.J_SRNRBNWK);
                    return;
                }
                if (this.inputTxt.text.length > 100) {
                    mg.alertManager.tip(Language.J_ZDX1GZ);
                    return;
                }
                this._msgList.push({ Msg: this.inputTxt.text, Time: (GameModels.timer.getTimer() / 1000), type: 2 });
                GameModels.chat.requestSendSuggestMsg(this.inputTxt.text);
                this._msgList.push({ Msg: Language.J_KF1, Time: (GameModels.timer.getTimer() / 1000), type: 1 });
                this.inputTxt.text = "";
                this.showView();
            };
            StrategyTuCao.prototype.labClick = function (e) {
                mg.uiManager.show(dialog.strategy.StrategyMain, { tabIndex: 1 });
            };
            StrategyTuCao.prototype.exit = function () {
                var list = [];
                this._listChatData = null;
                this.clearList(this.list);
                this.inputTxt.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onCharactorFocusIn, this);
                this.btnSend.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                this.labStraegy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.labClick, this);
            };
            return StrategyTuCao;
        }(ui.StrategyTuCaoSkin));
        strategy.StrategyTuCao = StrategyTuCao;
        __reflect(StrategyTuCao.prototype, "dialog.strategy.StrategyTuCao");
    })(strategy = dialog.strategy || (dialog.strategy = {}));
})(dialog || (dialog = {}));
