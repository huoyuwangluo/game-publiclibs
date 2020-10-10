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
var RankAwardGet = (function (_super) {
    __extends(RankAwardGet, _super);
    function RankAwardGet() {
        var _this = _super.call(this) || this;
        _this._dropItems = null;
        return _this;
    }
    RankAwardGet.prototype.show = function (data) {
        this.rankNum.text = Language.getExpression(Language.E_D1M, data.MyRank);
        this.labPlayerName0.text = GameModels.user.player.name;
        this.imgHead0.source = ResPath.getPlayerIconSmall(GameModels.user.player.headIcon);
        var arr = [];
        for (var i = 0; i < data.Items.length; i++) {
            arr.push(data.Items[i].ItemRefId + "_" + data.Items[i].Count);
        }
        this.list0.dataProvider = new eui.ArrayCollection(arr);
        this.btnOK0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnUpSureClick, this);
    };
    RankAwardGet.prototype.btnUpSureClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    RankAwardGet.prototype.hide = function () {
        this._data = null;
        if (this.parent) {
            this.parent.removeChild(this);
            this.btnOK0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnUpSureClick, this);
            if (app.gameContext.typeGame == TypeGame.KING_BATTLE_GROUD) {
                app.gameContext.exitToMainGame();
            }
            GameModels.state.updateState(GameRedState.XIANSHI_WANGZHE);
            GameModels.state.updateState(GameRedState.CITY);
        }
    };
    return RankAwardGet;
}(ui.RankAwardGetSkin));
__reflect(RankAwardGet.prototype, "RankAwardGet", ["IAlert", "egret.DisplayObject"]);
