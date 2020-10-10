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
var item;
(function (item) {
    var MainCampBattlePlayer = (function (_super) {
        __extends(MainCampBattlePlayer, _super);
        function MainCampBattlePlayer() {
            return _super.call(this) || this;
        }
        MainCampBattlePlayer.prototype.initialize = function () {
            this._pos = 0;
        };
        MainCampBattlePlayer.prototype.initializeData = function (data) {
            if (this._playerVO) {
                this._playerVO.offTeamHpChange(this, this.hpChange);
            }
            this._playerVO = data;
            if (this._playerVO) {
                this.head.source = ResPath.getPlayerIconSmall(this._playerVO.headIcon);
                this.labCampPlayerName.text = this._playerVO.name;
                this._playerVO.onTeamHpChange(this, this.hpChange);
                this.hpChange();
            }
        };
        MainCampBattlePlayer.prototype.setOrder = function (v) {
            if (v > 0) {
                this.imgPos.visible = true;
                this.labPos.text = Language.getExpression(Language.E_1RHRC, v.toString());
            }
            else {
                this.imgPos.visible = false;
                this.labPos.text = "";
            }
        };
        MainCampBattlePlayer.prototype.setqueue = function (v) {
            this.labCampPos.text = v + Language.C_DUI;
        };
        Object.defineProperty(MainCampBattlePlayer.prototype, "pos", {
            get: function () {
                return this._pos;
            },
            set: function (v) {
                this._pos = v;
            },
            enumerable: true,
            configurable: true
        });
        MainCampBattlePlayer.prototype.hpChange = function () {
            this.hpBar.value = (this._playerVO.getTeamHp() / this._playerVO.getTeamHpMax()) * 100;
        };
        Object.defineProperty(MainCampBattlePlayer.prototype, "playerVO", {
            get: function () {
                return this._playerVO;
            },
            enumerable: true,
            configurable: true
        });
        return MainCampBattlePlayer;
    }(ui.MainCampBattlePlayerSkin));
    item.MainCampBattlePlayer = MainCampBattlePlayer;
    __reflect(MainCampBattlePlayer.prototype, "item.MainCampBattlePlayer");
})(item || (item = {}));
