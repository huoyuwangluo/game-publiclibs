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
    var EquipListVO = (function (_super) {
        __extends(EquipListVO, _super);
        function EquipListVO(parent) {
            var _this = _super.call(this) || this;
            _this._parent = parent;
            _this._list = [];
            return _this;
        }
        EquipListVO.prototype.initialize = function () {
        };
        EquipListVO.prototype.reset = function () {
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var equipVO = _a[_i];
                vo.toPool(equipVO);
            }
            this._list.length = 0;
        };
        /**添加*/
        EquipListVO.prototype.add = function (equipVO) {
            var curVO = this.getVOByPos(equipVO.pos);
            if (curVO == equipVO)
                return equipVO;
            if (!!curVO) {
                this.remove(curVO.pos);
            }
            this._list.push(equipVO);
            this._parent.updateAvatar(equipVO.pos, equipVO.modelId);
            if (this._changeHandlers)
                this._changeHandlers.runWith(equipVO.pos);
            return equipVO;
        };
        /**删除*/
        EquipListVO.prototype.remove = function (pos) {
            var index = this.getVOIndex(pos);
            if (index >= 0) {
                var equipVO = this._list[index];
                var pos = equipVO.pos;
                this._list.splice(index, 1);
                vo.toPool(equipVO);
                this._parent.updateAvatar(pos, null);
                if (this._changeHandlers)
                    this._changeHandlers.runWith(pos);
            }
        };
        EquipListVO.prototype.onPosChange = function (caller, method) {
            if (!this._changeHandlers)
                this._changeHandlers = new utils.Handlers(false);
            this._changeHandlers.add(caller, method);
        };
        EquipListVO.prototype.offPosChange = function (caller, method) {
            if (this._changeHandlers) {
                this._changeHandlers.remove(caller, method);
            }
        };
        Object.defineProperty(EquipListVO.prototype, "list", {
            /** 获得列表*/
            get: function () {
                return this._list;
            },
            enumerable: true,
            configurable: true
        });
        EquipListVO.prototype.forEach = function (func, caller) {
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var equipVO = _a[_i];
                func.call(caller, equipVO);
            }
        };
        /** 获得VO*/
        EquipListVO.prototype.getVO = function (type) {
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var equipVO = _a[_i];
                if (equipVO.type == type)
                    return equipVO;
            }
            return null;
        };
        /** 获得VO*/
        EquipListVO.prototype.getVOByPos = function (pos) {
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var equipVO = _a[_i];
                if (equipVO.pos == pos)
                    return equipVO;
            }
            return null;
        };
        /** 获得VO*/
        EquipListVO.prototype.getVOIndex = function (pos) {
            for (var i; i < this._list.length; i++) {
                if (this._list[i].pos == pos)
                    return i;
            }
            return -1;
        };
        return EquipListVO;
    }(vo.VOBase));
    vo.EquipListVO = EquipListVO;
    __reflect(EquipListVO.prototype, "vo.EquipListVO");
})(vo || (vo = {}));
