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
    var LegionVo = (function (_super) {
        __extends(LegionVo, _super);
        function LegionVo() {
            return _super.call(this) || this;
        }
        LegionVo.prototype.initialize = function (data) {
            if (data) {
                this.decode(data);
            }
        };
        LegionVo.prototype.reset = function () {
            if (this._legionData) {
                this._legionData.reset();
                n.MessagePool.to(this._legionData);
                this._legionData = null;
            }
        };
        LegionVo.prototype.decode = function (data) {
            data.autoRecover = false;
            this._legionData = data;
        };
        Object.defineProperty(LegionVo.prototype, "legionData", {
            get: function () {
                return this._legionData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionVo.prototype, "legionLv", {
            get: function () {
                return this._legionData.UnionLv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionVo.prototype, "prestige", {
            get: function () {
                return this._legionData.Prestige;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionVo.prototype, "legionRank", {
            get: function () {
                return this._legionData.Rank;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionVo.prototype, "legionCount", {
            get: function () {
                return this._legionData.MemberCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionVo.prototype, "legionId", {
            get: function () {
                return this._legionData.UnionId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionVo.prototype, "legionName", {
            get: function () {
                return TypeUnionName.NITICE[this._legionData.UnionId - 1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionVo.prototype, "legionFightPower", {
            get: function () {
                return this._legionData.FightPower;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LegionVo.prototype, "memberCount", {
            get: function () {
                return this._legionData.MemberCount;
            },
            enumerable: true,
            configurable: true
        });
        return LegionVo;
    }(vo.VOBase));
    vo.LegionVo = LegionVo;
    __reflect(LegionVo.prototype, "vo.LegionVo");
})(vo || (vo = {}));
