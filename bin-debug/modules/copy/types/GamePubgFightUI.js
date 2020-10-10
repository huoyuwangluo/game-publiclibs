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
    var GamePubgFightUI = (function (_super) {
        __extends(GamePubgFightUI, _super);
        function GamePubgFightUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(GamePubgFightUI, "instance", {
            get: function () {
                if (!GamePubgFightUI._instance) {
                    GamePubgFightUI._instance = new GamePubgFightUI();
                }
                return GamePubgFightUI._instance;
            },
            enumerable: true,
            configurable: true
        });
        GamePubgFightUI.prototype.enter = function (battleScene, battleAttackHandler) {
            this._battleAttackHandler = battleAttackHandler;
            utils.timer.loop(1000, this, this.updateJueInfo);
            this.ui.listAttacker.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.listItemTapHandler, this);
            this.ui.listAttacker.dataProvider = battleScene.attackersCollection;
            this.updateJueInfo();
        };
        GamePubgFightUI.prototype.exit = function () {
            this.ui.listAttacker.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.listItemTapHandler, this);
            utils.timer.clear(this, this.updateJueInfo);
        };
        GamePubgFightUI.prototype.updateJueInfo = function () {
            //游戏时间开始前5分钟等待
            /*if (GameModels.scenePubg.beginCountdown > 0) {
                this.ui.timeStateImg.source = "limitactivities_json.img_ksdjs";
                var str = utils.DateUtil.formatTimeLeft(GameModels.scenePubg.beginCountdown)
                str = str.substring(3, str.length)
                this.ui.integralTime.text = str;
                this.ui.integralInfo.text = Language.J_QWFZMYSH;
            } else {
                this.ui.timeStateImg.source = "limitactivities_json.img_sywj";
                this.ui.integralTime.text = GameModels.scenePubg.leftCount + "";//剩余人数
                this.ui.integralInfo.text = "";
            }*/
        };
        GamePubgFightUI.prototype.listItemTapHandler = function (e) {
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
            if (playerVO.isTeamAllDead) {
                mg.alertManager.tip(Language.J_GWJYSW);
                return;
            }
            if (this._battleAttackHandler) {
                this._battleAttackHandler.runWith(playerVO);
            }
        };
        return GamePubgFightUI;
    }(copy.GameUIBase));
    copy.GamePubgFightUI = GamePubgFightUI;
    __reflect(GamePubgFightUI.prototype, "copy.GamePubgFightUI");
})(copy || (copy = {}));
