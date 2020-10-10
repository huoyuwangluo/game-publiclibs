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
var tips;
(function (tips) {
    var LegionBattleHelp = (function (_super) {
        __extends(LegionBattleHelp, _super);
        function LegionBattleHelp() {
            return _super.call(this) || this;
        }
        Object.defineProperty(LegionBattleHelp.prototype, "data", {
            /**type=1关卡求助 2为远征  data={type:,data}*/
            set: function (data) {
                this._type = data.type;
                this._data = data.data;
                var voList = this._type == 1 ? GameModels.chapter.nowPlayerData.List : GameModels.legion.nowPlayerData.List;
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(voList);
                }
                else {
                    this._listData.source = voList;
                }
                this.list.dataProvider = this._listData;
                this.labNo.visible = voList.length <= 0;
                if (this._type == 1) {
                    //this.labFight.text = GameModels.user.player.totalFightValue + "";
                    this.labTitle.text = Language.C_GCQZ;
                    this.labDes.text = Language.J_QZ1;
                }
                else {
                    //this.labFight.text = GameModels.user.player.totalFightValue + "";
                    this.labTitle.text = Language.C_YZQZ;
                    this.labDes.text = Language.J_QZ1;
                }
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTouch, this);
            },
            enumerable: true,
            configurable: true
        });
        LegionBattleHelp.prototype.itemTouch = function (e) {
            if (e.target instanceof components.SnapButton) {
                var vo = this.list.selectedItem;
                mg.TipManager.instance.removeBlack();
                if (this._type == 1) {
                    app.gameContext.enterChapterCity(vo.PlayerId);
                }
                else {
                    // app.gameContext.enterExpeditionSupport(vo.PlayerId, this._data);
                    app.gameContext.enterExpeditionSupport(vo.PlayerId);
                }
                this.removeSelf();
            }
        };
        LegionBattleHelp.prototype.onClose = function (e) {
            mg.TipManager.instance.removeBlack();
            this.removeSelf();
        };
        LegionBattleHelp.prototype.removeSelf = function () {
            this._type = 0;
            this.clearList(this.list);
            mg.TipManager.instance.setCurrent();
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTouch, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return LegionBattleHelp;
    }(ui.LegionBattleHelpSkin));
    tips.LegionBattleHelp = LegionBattleHelp;
    __reflect(LegionBattleHelp.prototype, "tips.LegionBattleHelp", ["ITipLogic", "egret.DisplayObject"]);
})(tips || (tips = {}));
