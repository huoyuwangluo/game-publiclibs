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
var legionWar;
(function (legionWar) {
    var LegionWarSmallRank = (function (_super) {
        __extends(LegionWarSmallRank, _super);
        function LegionWarSmallRank() {
            var _this = _super.call(this) || this;
            _this._togs = [_this.btnPerson, _this.btnLegion];
            _this._items = [_this.item1, _this.item2, _this.item3, _this.item4, _this.item5, _this.item6, _this.item7, _this.item8, _this.item9, _this.item10];
            return _this;
        }
        LegionWarSmallRank.prototype.enter = function (type) {
            if (type === void 0) { type = ""; }
            this._type = type;
            this.btnPerson.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.btnLegion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.btnUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._isSmall = true;
            this.currentState = "small";
            this.onSelectRank(0);
        };
        LegionWarSmallRank.prototype.exit = function () {
            this.btnPerson.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.btnLegion.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.btnUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.btnDown.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        };
        LegionWarSmallRank.prototype.onTouchHandler = function (e) {
            switch (e.target) {
                case this.btnPerson:
                    this.onSelectRank(0);
                    break;
                case this.btnLegion:
                    this.onSelectRank(1);
                    break;
                case this.btnUp:
                    this._isSmall = true;
                    this.currentState = "small";
                    this.onSelectHight();
                    break;
                case this.btnDown:
                    this._isSmall = false;
                    this.currentState = "big";
                    this.onSelectHight();
                    break;
            }
        };
        LegionWarSmallRank.prototype.onSelectRank = function (index) {
            this._selectType = index;
            for (var i = 0; i < this._togs.length; i++) {
                this._togs[i].selected = (i == index);
                this._togs[i].touchEnabled = (i != index);
            }
            this.onSelectHight();
        };
        LegionWarSmallRank.prototype.onSelectHight = function () {
            this.upData();
            if (this._selectType == 0) {
                this.labMyTitel.text = Language.C_WDJF;
            }
            else {
                this.labMyTitel.text = Language.C_WDJT;
            }
        };
        LegionWarSmallRank.prototype.upData = function () {
            if (this._type == "KingBattlefield") {
                this.btnLegion.visible = false;
                this.btnPerson.visible = false;
                var rankNum = 3;
                if (!this._isSmall) {
                    rankNum = 10;
                }
                var list;
                if (this._selectType == 0) {
                    list = GameModels.sceneKingBattle.curPersonScoreList;
                    this.labMyRank.text = "" + ((GameModels.sceneKingBattle.curMyRank > 10 || GameModels.sceneKingBattle.curMyRank <= 0) ? Language.Z_WU : GameModels.sceneKingBattle.curMyRank);
                    this.labMyScore.text = "" + GameModels.sceneKingBattle.curMyScore;
                }
                else {
                    list = GameModels.sceneKingBattle.curUnionScoreList;
                    this.labMyRank.text = "" + ((GameModels.sceneKingBattle.curMyUnionRank > 10 || GameModels.sceneKingBattle.curMyRank <= 0) ? Language.Z_WU : GameModels.sceneKingBattle.curMyUnionRank);
                    this.labMyScore.text = "" + GameModels.sceneKingBattle.curMyUnionScore;
                }
                for (var i = 0; i < 10; i++) {
                    if (i < rankNum && list[i]) {
                        this._items[i].upData(list[i], this._selectType);
                    }
                    else {
                        this._items[i].upData(null, this._selectType);
                    }
                }
            }
            else {
                this.btnLegion.visible = true;
                this.btnPerson.visible = true;
                var rankNum = 3;
                if (!this._isSmall) {
                    rankNum = 10;
                }
                var list;
                if (this._selectType == 0) {
                    list = GameModels.sceneLegin.curPersonScoreList;
                    this.labMyRank.text = "" + ((GameModels.sceneLegin.curMyRank > 10 || GameModels.sceneLegin.curMyRank <= 0) ? Language.Z_WU : GameModels.sceneLegin.curMyRank);
                    this.labMyScore.text = "" + GameModels.sceneLegin.curMyScore;
                }
                else {
                    list = GameModels.sceneLegin.curUnionScoreList;
                    this.labMyRank.text = "" + ((GameModels.sceneLegin.curMyUnionRank > 10 || GameModels.sceneLegin.curMyRank <= 0) ? Language.Z_WU : GameModels.sceneLegin.curMyUnionRank);
                    this.labMyScore.text = "" + GameModels.sceneLegin.curMyUnionScore;
                }
                for (var i = 0; i < 10; i++) {
                    if (i < rankNum && list[i]) {
                        this._items[i].upData(list[i], this._selectType);
                    }
                    else {
                        this._items[i].upData(null, this._selectType);
                    }
                }
            }
        };
        return LegionWarSmallRank;
    }(ui.LegionWarSmallRankSkin));
    legionWar.LegionWarSmallRank = LegionWarSmallRank;
    __reflect(LegionWarSmallRank.prototype, "legionWar.LegionWarSmallRank");
})(legionWar || (legionWar = {}));
