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
    /**其他角色装备VO(排行榜查看) */
    var EquipOtherPlayerVO = (function (_super) {
        __extends(EquipOtherPlayerVO, _super);
        function EquipOtherPlayerVO() {
            return _super.call(this) || this;
        }
        EquipOtherPlayerVO.prototype.initialize = function (data, moHunLevel, baoShiLevel, zhuLingLevel, refineLevel) {
            if (moHunLevel === void 0) { moHunLevel = 0; }
            if (baoShiLevel === void 0) { baoShiLevel = 0; }
            if (zhuLingLevel === void 0) { zhuLingLevel = 0; }
            if (refineLevel === void 0) { refineLevel = 0; }
            _super.prototype.initialize.call(this, data);
            this._MoHunLevel = moHunLevel;
            this._BaoShiLevel = baoShiLevel;
            this._ZhuLingLevel = zhuLingLevel;
            this._RefineLevel = refineLevel;
            return this;
        };
        EquipOtherPlayerVO.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this._MoHunLevel = 0;
            this._BaoShiLevel = 0;
            this._ZhuLingLevel = 0;
            this._RefineLevel = 0;
        };
        Object.defineProperty(EquipOtherPlayerVO.prototype, "MoHunLevel", {
            get: function () {
                return this._MoHunLevel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EquipOtherPlayerVO.prototype, "BaoShiLevel", {
            get: function () {
                return this._BaoShiLevel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EquipOtherPlayerVO.prototype, "ZhuLingLevl", {
            get: function () {
                return this._ZhuLingLevel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EquipOtherPlayerVO.prototype, "RefineLevel", {
            get: function () {
                return this._RefineLevel;
            },
            enumerable: true,
            configurable: true
        });
        return EquipOtherPlayerVO;
    }(vo.EquipVO));
    vo.EquipOtherPlayerVO = EquipOtherPlayerVO;
    __reflect(EquipOtherPlayerVO.prototype, "vo.EquipOtherPlayerVO");
})(vo || (vo = {}));
