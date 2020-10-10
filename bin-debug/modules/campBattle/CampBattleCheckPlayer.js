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
    var campBattle;
    (function (campBattle) {
        var CampBattleCheckPlayer = (function (_super) {
            __extends(CampBattleCheckPlayer, _super);
            function CampBattleCheckPlayer() {
                return _super.call(this) || this;
            }
            CampBattleCheckPlayer.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._fightPower = [this.leftFightPower0, this.leftFightPower1];
                this._btnArr = [this.btn0, this.btn1, this.btn2];
                this._leftInfo = [];
                this._rightInfo = [];
                this._pos = 0;
                this._colorArr = [0xf4b9bd, 0xb2cdde, 0xd2eebd];
                this._bgArr = [this.img_bg1, this.img_bg2];
            };
            CampBattleCheckPlayer.prototype.enter = function (data, pos) {
                var _this = this;
                if (pos === void 0) { pos = 0; }
                this._battleId = data;
                this._pos = pos;
                if (!this._battleId)
                    return;
                GameModels.campBattle.requesBattlePlayerInfo(this._battleId, utils.Handler.create(this, function () {
                    _this.showView();
                }));
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                this.updateTitle("campBattleJoin");
            };
            CampBattleCheckPlayer.prototype.showView = function () {
                for (var i = 0; i < this._btnArr.length; i++) {
                    if (i == this._pos) {
                        this._btnArr[i].currentState = "down";
                    }
                    else {
                        this._btnArr[i].currentState = "up";
                    }
                }
                this.imgSelecd.x = this._btnArr[this._pos].x;
                var unionArr = GameModels.campBattle.getUnionList(this._battleId);
                for (var j = 0; j < this._bgArr.length; j++) {
                    if (unionArr[j]) {
                        this._bgArr[j].source = "img_countryWar_" + unionArr[j] + "_bg_png";
                        this._fightPower[j].textColor = this._colorArr[unionArr[j] - 1];
                    }
                }
                this._leftInfo = GameModels.campBattle.campLeftRoadDetailList.concat();
                this._rightInfo = GameModels.campBattle.campRightRoadDetailList.concat();
                this.showList(this._pos);
            };
            CampBattleCheckPlayer.prototype.showList = function (pos) {
                var leftArr = [];
                var rightArr = [];
                var leftPower = 0;
                var rightPower = 0;
                for (var i = 0; i < this._leftInfo.length; i++) {
                    if (this._leftInfo[i].Pos == pos) {
                        for (var _i = 0, _a = this._leftInfo[i].PlayerList; _i < _a.length; _i++) {
                            var item = _a[_i];
                            leftPower += item.FightPower;
                            leftArr.push(item);
                        }
                        break;
                    }
                }
                for (var j = 0; j < this._rightInfo.length; j++) {
                    if (this._rightInfo[j].Pos == pos) {
                        for (var _b = 0, _c = this._rightInfo[i].PlayerList; _b < _c.length; _b++) {
                            var items = _c[_b];
                            rightPower += items.FightPower;
                            rightArr.push(items);
                        }
                        break;
                    }
                }
                if (!this._listDate1) {
                    this._listDate1 = new eui.ArrayCollection();
                }
                this._listDate1.source = leftArr;
                this.list0.dataProvider = this._listDate1;
                if (!this._listDate2) {
                    this._listDate2 = new eui.ArrayCollection();
                }
                this._listDate2.source = rightArr;
                this.list1.dataProvider = this._listDate2;
                this.leftFightPower0.text = Language.getExpression(Language.E_ZHZL, leftPower);
                this.leftFightPower1.text = Language.getExpression(Language.E_ZHZL, rightPower);
            };
            CampBattleCheckPlayer.prototype.onBtnClick = function (evt) {
                var index = this._btnArr.indexOf(evt.currentTarget);
                for (var i = 0; i < this._btnArr.length; i++) {
                    if (i == index) {
                        this._btnArr[i].currentState = "down";
                    }
                    else {
                        this._btnArr[i].currentState = "up";
                    }
                }
                this.imgSelecd.x = evt.currentTarget.x;
                this.showList(index);
            };
            CampBattleCheckPlayer.prototype.exit = function () {
                this.clearList(this.list0);
                this.clearList(this.list1);
                this._leftInfo = [];
                this._rightInfo = [];
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
            };
            return CampBattleCheckPlayer;
        }(ui.CampBattleCheckPlayerSkin));
        campBattle.CampBattleCheckPlayer = CampBattleCheckPlayer;
        __reflect(CampBattleCheckPlayer.prototype, "dialog.campBattle.CampBattleCheckPlayer");
    })(campBattle = dialog.campBattle || (dialog.campBattle = {}));
})(dialog || (dialog = {}));
