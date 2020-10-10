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
    var GameKingUnionUI = (function (_super) {
        __extends(GameKingUnionUI, _super);
        function GameKingUnionUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(GameKingUnionUI, "instance", {
            get: function () {
                if (!GameKingUnionUI._instance) {
                    GameKingUnionUI._instance = new GameKingUnionUI();
                }
                return GameKingUnionUI._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameKingUnionUI.prototype.enter = function () {
            this.ui.btnInspire.visible = true;
            this.ui.btnInspire.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.inspireKingUnionHandler, this);
            this.ui.listAttacker.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.listItemTapHandler, this);
        };
        GameKingUnionUI.prototype.exit = function () {
            this.ui.btnInspire.visible = false;
            this.ui.btnInspire.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.inspireKingUnionHandler, this);
            this.ui.listAttacker.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.listItemTapHandler, this);
        };
        GameKingUnionUI.prototype.inspireKingUnionHandler = function () {
            mg.alertManager.showAlert(NoendInspireAlert, true, true, TypeInspire.KINGUA, 200, 20, utils.Handler.create(this, function () {
                if (200 > GameModels.user.player.diamonds) {
                    mg.alertManager.tip(Language.J_MSBZ, 0xb6281a);
                    return;
                }
                // GameModels.kingUnionWar.inspireManor();
            }, null, false));
        };
        GameKingUnionUI.prototype.listItemTapHandler = function (e) {
            var playerVO = e.item;
            if (!playerVO || (playerVO && playerVO.uid == GameModels.user.player.uid))
                return;
            if (GameModels.user.player.target) {
                if (GameModels.user.player.target.type == TypeActor.PLAYER) {
                    if (GameModels.user.player.target == playerVO) {
                        mg.alertManager.tip(Language.J_ZZTZGWJ);
                        return;
                    }
                }
            }
            if (playerVO.hp <= 0) {
                mg.alertManager.tip(Language.J_GWJYSW);
                return;
            }
            if (this._battleAttackHandler) {
                this._battleAttackHandler.runWith(playerVO);
            }
        };
        return GameKingUnionUI;
    }(copy.GameUIBase));
    copy.GameKingUnionUI = GameKingUnionUI;
    __reflect(GameKingUnionUI.prototype, "copy.GameKingUnionUI");
})(copy || (copy = {}));
