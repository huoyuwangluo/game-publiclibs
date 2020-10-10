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
var mo;
(function (mo) {
    var ModelGameBook = (function (_super) {
        __extends(ModelGameBook, _super);
        function ModelGameBook() {
            return _super.call(this) || this;
        }
        ModelGameBook.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.initGameBook();
        };
        ModelGameBook.prototype.initGameBook = function () {
            this._gameBookTempArr = [];
            this._gameBookTempArr = Templates.getList(templates.Map.GAMEBOOK);
        };
        ModelGameBook.prototype.getGameBookTempBuyType = function (type) {
            var gameBookTemp = [];
            for (var i = 0; i < this._gameBookTempArr.length; i++) {
                if (this._gameBookTempArr[i].type == type) {
                    gameBookTemp.push(this._gameBookTempArr[i]);
                }
            }
            gameBookTemp.sort(function (a, b) {
                return b.starLv - a.starLv;
            });
            return gameBookTemp;
        };
        ModelGameBook.prototype.getGameBookTempBuyTypeAndSysType = function (type, sysType) {
            var gameBookTemp = [];
            for (var i = 0; i < this._gameBookTempArr.length; i++) {
                if (this._gameBookTempArr[i].type == type && this._gameBookTempArr[i].sysType == sysType) {
                    gameBookTemp.push(this._gameBookTempArr[i]);
                }
            }
            gameBookTemp.sort(function (a, b) {
                return b.starLv - a.starLv;
            });
            return gameBookTemp;
        };
        return ModelGameBook;
    }(mo.ModelBase));
    mo.ModelGameBook = ModelGameBook;
    __reflect(ModelGameBook.prototype, "mo.ModelGameBook");
})(mo || (mo = {}));
