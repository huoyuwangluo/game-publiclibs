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
var CopyBattleStatistics = (function (_super) {
    __extends(CopyBattleStatistics, _super);
    function CopyBattleStatistics() {
        return _super.call(this) || this;
    }
    CopyBattleStatistics.prototype.show = function (selfEndVo, otherEndVo, hashWin) {
        this.imgLeftWin.visible = this.imgRightWin.visible = hashWin > 0;
        ;
        this.imgLeftWin.source = hashWin == 1 ? "topBattle_json.img_battleWin" : "topBattle_json.img_battleLose";
        this.imgRightWin.source = hashWin == 2 ? "topBattle_json.img_battleWin" : "topBattle_json.img_battleLose";
        this._selfEndVo = selfEndVo;
        this._otherEndVo = otherEndVo;
        this._btnArr = [this.btn1, this.btn2, this.btn3];
        this._rendererArr = [this.rend1, this.rend2, this.rend3, this.rend4, this.rend5];
        this._selecdIndex = 0;
        this.showView();
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        for (var i = 0; i < this._btnArr.length; i++) {
            if (i == 0) {
                this._btnArr[i].currentState = "down";
            }
            else {
                this._btnArr[i].currentState = "up";
            }
            this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHandler, this);
        }
    };
    CopyBattleStatistics.prototype.showView = function () {
        this.imgSelecd.x = this._btnArr[this._selecdIndex].x;
        this.imgSelecd.y = this._btnArr[this._selecdIndex].y;
        this.labName1.text = this._selfEndVo.name;
        this.labName2.text = this._otherEndVo.name;
        var selfList = this._selfEndVo.getVoListByType(this._selecdIndex);
        var otherList = this._otherEndVo.getVoListByType(this._selecdIndex);
        var lent = selfList.length;
        if (otherList.length > lent)
            lent = otherList.length;
        var maxCount = 0;
        if (this._selecdIndex == 0) {
            var numSelf = selfList[0] ? selfList[0].dmg : 0;
            var numOther = otherList[0] ? otherList[0].dmg : 0;
            numOther > numSelf ? maxCount = numOther : maxCount = numSelf;
        }
        else if (this._selecdIndex == 1) {
            var numSelf = selfList[0] ? selfList[0].hurt : 0;
            var numOther = otherList[0] ? otherList[0].hurt : 0;
            numOther > numSelf ? maxCount = numOther : maxCount = numSelf;
        }
        else {
            var numSelf = selfList[0] ? selfList[0].heal : 0;
            var numOther = otherList[0] ? otherList[0].heal : 0;
            numOther > numSelf ? maxCount = numOther : maxCount = numSelf;
        }
        for (var i = 0; i < this._rendererArr.length; i++) {
            this._rendererArr[i].data = null;
            if (i < lent) {
                this._rendererArr[i].visible = true;
                var obj = { index: i, selfData: selfList[i], otherData: otherList[i], type: this._selecdIndex, max: maxCount };
                this._rendererArr[i].data = obj;
            }
            else {
                this._rendererArr[i].visible = false;
            }
        }
    };
    CopyBattleStatistics.prototype.hide = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        for (var i = 0; i < this._btnArr.length; i++) {
            this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHandler, this);
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    CopyBattleStatistics.prototype.btnHandler = function (e) {
        for (var i = 0; i < this._btnArr.length; i++) {
            if (e.currentTarget == this._btnArr[i]) {
                this._selecdIndex = i;
                this._btnArr[i].currentState = "down";
                this.showView();
            }
            else {
                this._btnArr[i].currentState = "up";
            }
        }
    };
    CopyBattleStatistics.prototype.closeHandler = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return CopyBattleStatistics;
}(ui.CopyBattleStatisticsSkin));
__reflect(CopyBattleStatistics.prototype, "CopyBattleStatistics", ["IAlert", "egret.DisplayObject"]);
