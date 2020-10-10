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
var vo;
(function (vo) {
    //特权卡
    var SpecailCardVo = (function (_super) {
        __extends(SpecailCardVo, _super);
        function SpecailCardVo() {
            return _super.call(this) || this;
        }
        SpecailCardVo.prototype.initialize = function () {
            this._type = 0;
            this._cardStatus = 0;
            this._leftDays = 0;
            this._doneGotReward = 0;
            this._needWarning = 0;
            this._older = 0;
        };
        SpecailCardVo.prototype.reset = function () {
            this._type = 0;
            this._cardStatus = 0;
            this._leftDays = 0;
            this._doneGotReward = 0;
            this._needWarning = 0;
            this._older = 0;
        };
        SpecailCardVo.prototype.decode = function (data) {
            this._type = data.Type;
            this._cardStatus = data.CardStatus;
            this._leftDays = data.LeftDays;
            this._doneGotReward = data.DoneGotReward;
            this._needWarning = data.NeedWarning;
            if (this.type == 3) {
                this._older = 2;
            }
            else if (this.type == 4) {
                this._older = 3;
            }
            else if (this.type == 5) {
                this._older = 0;
            }
            else if (this.type == 6) {
                this._older = 4;
            }
            else if (this.type == 7) {
                this._older = 1;
            }
        };
        Object.defineProperty(SpecailCardVo.prototype, "older", {
            get: function () {
                return this._older;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpecailCardVo.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpecailCardVo.prototype, "cardStatus", {
            get: function () {
                return this._cardStatus;
            },
            set: function (v) {
                this._cardStatus = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpecailCardVo.prototype, "leftDays", {
            get: function () {
                return this._leftDays;
            },
            set: function (v) {
                this._leftDays = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpecailCardVo.prototype, "doneGotReward", {
            get: function () {
                return this._doneGotReward;
            },
            set: function (v) {
                this._doneGotReward = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpecailCardVo.prototype, "needWarning", {
            get: function () {
                return this._needWarning;
            },
            set: function (v) {
                this._needWarning = v;
            },
            enumerable: true,
            configurable: true
        });
        return SpecailCardVo;
    }(vo.VOBase));
    vo.SpecailCardVo = SpecailCardVo;
    __reflect(SpecailCardVo.prototype, "vo.SpecailCardVo");
})(vo || (vo = {}));
