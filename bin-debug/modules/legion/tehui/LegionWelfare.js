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
    var legion;
    (function (legion) {
        var LegionWelfare = (function (_super) {
            __extends(LegionWelfare, _super);
            function LegionWelfare() {
                return _super.call(this) || this;
            }
            LegionWelfare.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            LegionWelfare.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                GameModels.legion.newRedBag = false;
                this._redBagList = [];
                this._recordRedBagList = [];
                this.showView();
                this.redBagList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemClick, this);
                this.lab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRewardClick, this);
            };
            LegionWelfare.prototype.showView = function () {
                var _this = this;
                GameModels.legion.getLegionRedBagInfo(utils.Handler.create(this, function () {
                    _this._redBagList = GameModels.legion.redBagList;
                    _this._recordRedBagList = GameModels.legion.recordRedBagList;
                    _this.noRedBagGroup.visible = _this._redBagList.length <= 0;
                    _this.lab.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_HHDL);
                    if (!_this._listData) {
                        _this._listData = new eui.ArrayCollection(_this._redBagList);
                    }
                    else {
                        _this._listData.source = _this._redBagList;
                    }
                    _this.redBagList.dataProvider = _this._listData;
                    if (!_this._recordListData) {
                        _this._recordListData = new eui.ArrayCollection(_this._recordRedBagList);
                    }
                    else {
                        _this._recordListData.source = _this._recordRedBagList;
                    }
                    _this.list.dataProvider = _this._recordListData;
                }));
            };
            LegionWelfare.prototype.onItemClick = function (e) {
                var _this = this;
                var item = this.redBagList.selectedItem;
                GameModels.legion.getRedBagReward(item.Id, utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.C_LQCG);
                    _this.showView();
                }));
            };
            LegionWelfare.prototype.btnRewardClick = function () {
                if (GameModels.timer.getPastSecond() - GameModels.legion.refreshTime > 60) {
                    GameModels.legion.refreshTime = GameModels.timer.getPastSecond();
                }
                else {
                    mg.alertManager.tip(Language.getExpression(Language.E_1MHJXHH, (60 - (GameModels.timer.getPastSecond() - GameModels.legion.refreshTime))));
                    return;
                }
                mg.alertManager.tip(Language.J_FSCG);
                var tem = Templates.getTemplateById(templates.Map.SYSNOTICE, 2011);
                GameModels.chat.sendHandler(TypeChatChannel.LEGION, tem.desc);
            };
            LegionWelfare.prototype.exit = function () {
                this.clearList(this.list);
                this.clearList(this.redBagList);
                this.lab.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRewardClick, this);
                this.redBagList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemClick, this);
            };
            return LegionWelfare;
        }(ui.LegionWelfareSkin));
        legion.LegionWelfare = LegionWelfare;
        __reflect(LegionWelfare.prototype, "dialog.legion.LegionWelfare");
    })(legion = dialog.legion || (dialog.legion = {}));
})(dialog || (dialog = {}));
